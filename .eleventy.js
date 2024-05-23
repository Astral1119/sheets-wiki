// Plugins from Obsidian Garden
const markdownIt = require("markdown-it");
const { parse } = require("node-html-parser");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { headerToId, namedHeadingsFilter } = require("./src/_helpers/utils");
const {
  userMarkdownSetup,
  userEleventySetup,
} = require("./src/_helpers/userSetup");

// This is for the NEAT Template.
const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const fs = require('fs');

module.exports = function (eleventyConfig) {

  // Obsidian Garden Markdown tools.
  // First section enables some nice base functionality.
  let markdownLib = markdownIt({
    breaks: true,
    html: true,
    linkify: true,
  })
  // These add additional plugins.
    .use(require("markdown-it-anchor"), {
      slugify: headerToId,
    })
    .use(require("markdown-it-mark"))
    .use(require("markdown-it-footnote"))
    .use(require("markdown-it-mathjax3"), {
      tex: {
        inlineMath: [["$", "$"]],
      },
      options: {
        skipHtmlTags: { "[-]": ["pre"] },
      },
    })
    .use(require("markdown-it-attrs"))
    .use(require("markdown-it-task-checkbox"), {
      disabled: true,
      divWrap: false,
      divClass: "checkbox",
      idPrefix: "cbx_",
      ulClass: "task-list",
      liClass: "task-list-item",
    })
    .use(require("markdown-it-plantuml"), {
      openMarker: "```plantuml",
      closeMarker: "```",
    })
    .use(namedHeadingsFilter)
    .use(userMarkdownSetup);

  // Actually set the library.
  eleventyConfig.setLibrary("md", markdownLib);

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // Obsidian Garden Callout Blocks
  eleventyConfig.addTransform("callout-block", function (str) {
    const parsed = parse(str);

    const transformCalloutBlocks = (
      blockquotes = parsed.querySelectorAll("blockquote")
    ) => {
      for (const blockquote of blockquotes) {
        transformCalloutBlocks(blockquote.querySelectorAll("blockquote"));

        let content = blockquote.innerHTML;

        let titleDiv = "";
        let calloutType = "";
        let calloutMetaData = "";
        let isCollapsable;
        let isCollapsed;
        const calloutMeta = /\[!([\w-]*)\|?(\s?.*)\](\+|\-){0,1}(\s?.*)/;
        if (!content.match(calloutMeta)) {
          continue;
        }

        content = content.replace(
          calloutMeta,
          function (metaInfoMatch, callout, metaData, collapse, title) {
            isCollapsable = Boolean(collapse);
            isCollapsed = collapse === "-";
            const titleText = title.replace(/(<\/{0,1}\w+>)/, "")
              ? title
              : `${callout.charAt(0).toUpperCase()}${callout
                .substring(1)
                .toLowerCase()}`;
            const fold = isCollapsable
              ? `<div class="callout-fold"><i icon-name="chevron-down"></i></div>`
              : ``;

            calloutType = callout;
            calloutMetaData = metaData;
            titleDiv = `<div class="callout-title"><div class="callout-title-inner">${titleText}</div>${fold}</div>`;
            return "";
          }
        );

        blockquote.tagName = "div";
        blockquote.classList.add("callout");
        blockquote.classList.add(isCollapsable ? "is-collapsible" : "");
        blockquote.classList.add(isCollapsed ? "is-collapsed" : "");
        blockquote.setAttribute("data-callout", calloutType.toLowerCase());
        calloutMetaData && blockquote.setAttribute("data-callout-metadata", calloutMetaData);
        blockquote.innerHTML = `${titleDiv}\n<div class="callout-content">${content}</div>`;
      }
    };

    transformCalloutBlocks();

    return str && parsed.innerHTML;
  });

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "slash",
      singleTags: ["link"],
    },
  });

  // Adds more stuff from /src/helpers/userSetup
  // Not sure if this is necessary, may remove later
  userEleventySetup(eleventyConfig);

  // To Support .yaml Extension in _data
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/alpinejs/dist/cdn.min.js": "./static/js/alpine.js",
    "./node_modules/prismjs/themes/prism-tomorrow.css": "./static/css/prism-tomorrow.css",
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  // Optimizing SEO
  eleventyConfig.addPassthroughCopy("./src/robots.txt");
  eleventyConfig.addPassthroughCopy("./src/_headers");

  // Add aliasing, courtesy of Boehs
  eleventyConfig.addCollection("redirects", function (collectionApi) {
    // lets make a variable to hold our redirects
    let redirects = [];
    // We need to get each post in our posts folder. In my case this is /node
    const nodes = collectionApi.getFilteredByGlob("src/*/*.md");
    // next lets iterate over all the nodes
    nodes.forEach(node =>
      // for each alias
      (node.data.aliases || []).forEach(alias =>
        // push the target url and the old url
        redirects.push([node.data.page.url,node.data.page.url.replace(/\/[^\/]*?(\..+)?$/, `/${alias}$1`)])
      )
    )
    return redirects;
  });

  // Custom collection to gather pages along with their chapters
  eleventyConfig.addCollection("bookPages", function(collection) {
    // Initialize an empty array to store pages
    let bookPages = [];
    // Loop through each item in the 'books' collection
    collection.getFilteredByTag("books").forEach(book => {
        // Accessing the items array in the frontmatter of each book
        let bookItems = book.data.items;
        // Loop through each item in the 'items' array
        bookItems.forEach(item => {
            // Check if the item is a page
            if(item.page) {
                // Push the page details along with book and chapter info to the 'bookPages' array
                bookPages.push({
                    bookTitle: book.data.title,
                    page: item.page
                });
            } else {
                // If the item is a chapter with multiple pages
                item.pages.forEach(page => {
                    // Push each page along with book and chapter info to the 'bookPages' array
                    bookPages.push({
                        bookTitle: book.data.title,
                        chapterName: item.name,
                        page: page
                    });
                });
            }
        });
    });
    // Return the final array containing all pages along with their book and chapter info
    return bookPages;
  });

  
  eleventyConfig.addCollection("shelves", function(collection) {
    let shelves = {};

    collection.getFilteredByTag("books").forEach(function(item) {
        item.data.shelves.forEach(shelf => {
            if (shelves[shelf]) {
                shelves[shelf].push({
                    name: item.data.title,
                    description: item.data.description
                });
            } else {
                shelves[shelf] = [{  // Initialize shelves[shelf] as an array
                    name: item.data.title,
                    description: item.data.description
                }];
            }
        });
    });

    return shelves; // Return the shelves object
  });


  eleventyConfig.addCollection("datafp", function(collectionApi) {
    return {
        getAll: function() {
            // Return all items with metadata
            return collectionApi.getAllSorted().filter(item => item.data);
        },
        get: function(type, filepath) {
            // Find item by filepath
            return collectionApi.getFilteredByGlob("src/" + type + "/" + filepath + ".md");
        }
    };
  });

  eleventyConfig.addFilter("wrapTableInDiv", function(content) {
    // Regular expression to identify Markdown tables
    const tableRegex = /<table>([\s\S]+?)<\/table>/g;

    // Wrap each table match in a div with class "table-wrapper"
    return content;
  });

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    templateFormats: ["njk", "md", "11ty.js", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
};
