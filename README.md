# Campser : A Hugo theme

Campser is a single-column [AMP](https://www.ampproject.org/) theme for [Hugo](https://gohugo.io/). Its ported from [Casper theme for Hugo](https://github.com/vjeantet/hugo-theme-casper) (itself ported from [Casper theme for Ghost](https://github.com/TryGhost/Casper)).

The AMP specific parts where taken from [gohugo-amp starter theme](https://gohugo-amp.gohugohq.com/).

## Features
* Google Analytics
* Menu
* Pagination
* Social sharing (can be disabled by content)
* Big cover image (optional)
* Custom cover by content (optional)
* Tags (optional)
* Categories (optional)
* ~~Disqus~~
* Schema

# Theme assumptions
* All blog posts are of the type `post`
* Homepage displays a paginated list of content from the post section by default (can be configured)
* Homepage can also display full content from articles of type `index`

# Installation

## Installing the theme
```bash
cd $website_root
mkdir themes
cd themes
git clone https://github.com/DanielMuller/hugo-theme-campser campser
rm -rf campser/.git // To avoid conflicting with the website's git configuration
```

## Install HTML minifier
Read the styling section at [GOHUGO AMP](https://gohugo-amp.gohugohq.com/styling/) for more infos.
```bash
cd $website_root
npm i
```

## Building the website
```bash
cd $website_root
npm run build:prod
```

# Configuration
**config.toml**

Some configurations parameters where changed from the original Casper for Hugo theme.

```toml
title = "My awesome blog"
baseURL = "http://example.com/"
languageCode = "en-us"
theme = "campser"
[permalinks]
    post = '/:year/:month/:slug/' # Wordpress style
# Define the default author
[author]
    name = "Jonn Doe"
    bio = "The most uninteresting man in the world."
    location = "Normal, IL"
    website = "http://example.com"
    thumbnail = "/avatars/john.png"
[params]
    description = "my tagline"
    cover = "/layout/cover_singapore.jpg" # Homepage cover
    logo = "/logos/logo.png"
    # Social links on the homepage
    linkedinName = 'aaaa'
    githubName = 'aaaa'
    flickrName = 'aaaa'
    twitterName = 'aaaa'
    facebookName = 'aaaa'
    instagramName = 'aaaa'
    email = 'aaaa'
    pinterestName = 'aaaa'
    googlePlusName = 'aaaa'

    ampElements = ["amp-accordion","amp-analytics", "amp-sidebar"] # AMP elements loaded on every page
    themeColor = "#ffffff" # Browser bar color
    googleanalytics = "UA-1341906-9"

# Where can we share?
[params.share]
    twitter = true
    gplus = true
    pinterest = true
    facebook = true
```

## Menus
Menus are built by 3 components:

1. External links

    They are defined in *config.toml*
    ```toml
    [[menu.main]]
        name = 'Home'
        weight = 1
        url = '/'

    [[menu.main]]
        pre = "Links"
        name = 'My dear friend'
        weight = 210
        url = 'http://myfriend.com/'

    [[menu.main]]
        name = 'My photo gallery'
        weight = 220
        url = 'https://instagram.com/me/'
    ```
2. Pages

    In the *Front Matter*:
    ```toml
    [menu.main]
      weight = 110
    ```
3. Taxonomies

    Links and pages are ordered by *weight*.

    Taxonomies will always be shown last

## Favicon
Favicons paramteres are defined under *params.favicon* in your site's *config.toml*
```toml
[params.favicon]
    manifest = "manifest.json"
    basename = "/logos/favicon"
    ms_tilecolor = "#FFFFFF"
    icon = [16, 32, 96, 192]
    apple_touch = [57, 60, 72, 76, 114, 120, 144, 152, 180]
    ms = [144]
    ms_config = "browserconfig.xml"
```
You files need to be put in `/static/`, using any subfolder you define in `basename` and need to be named according to the params:
- favicon-&lt;w&gt;x&lt;h&gt;.png
- favicon-manifest.json
- favicon-browserconfig.xml

You can add *favicon.ico* to the static root for legacy browsers.

## Various formats for cover image
You need to create all versions and store them in the same path as the source file with following namings:
- filename.jpg (*original file*)
- filename-1080px.jpg (*downscaled to 1080px width*)
- filename-540px-2x.jpg (*downscaled to 1080px width, but used for 2x screens*)

All files can have their webp counterpart. Sizes, densities and webp support need to be defined in *config.toml*

**config.toml**
```toml
[params]
    cover = "/images/layout/my_cover.jpg"
    cover_sizes = [1920, 1280, 720, 360]
    cover_density = [1, 2, 3]
    cover_webp = true
```

## Taxonomies
The theme assumes the existence of 2 taxonomies: **Tags** and **Categories**, they don't need to be used.

## Multiples authors
Additionals authors can be defined in `data/authors/author_key.toml`

The *author_key* needs to be provided as the author in the *Front Matter*.

**jane.toml**
```toml
name = 'Jane Doe'
bio = "The most generic woman in the world"
location = "Normal, Il"
website = "http://janedoe.name"
thumbnail = "/avatars/jane.png"

```
**post/i-am-jane.md**
```md
+++
author = "jane"
title = "I am Jane"
slug = "i-am-jane"
+++

Hi! My name is Jane
```

When the *author_key* can't be found, the default author is used.

## Opengraph, Twitter Cards
Most existing data will be used, but some parameters can be added in *config.toml* and *Front Matter* to enhance the opengraph and twitter cards data

**config.toml**
```toml
[params]
    locale = "en_US"
[social]
    facebook = 'mypage' # Site's Facebook page
    facebook_admin = 'FB admin ID for page insights'
    twitter = 'Site twitter handle'
[author]
    facebook = 'authorfbpage' # Author's Facebook page
    twitter = 'Author Twitter handle'
```

When using multiple authors, the *facebook* or *twitter* attribute can be added to each author's data.

**Front Matter**
```toml
locale = "fr_CH"
images = ['a.jpg', 'b.jpg'] # If not provided, image will be used
audio = 'a.ogg'
videos = ['a.mp4', 'b.mp4']
series = ['first', 'another'] # You need to add Taxonomies.series to your site
description = 'Altername description for Facebook/Twitter' # If not provided, excerpt or summary are used
```

## Google News
**Front Matter**
```toml
news_keywords = ['word1', 'word2']
```

## Schema.org
**config.toml**
```toml
[params]
    alternatePageName = 'Alternate name'
# Organization
    organizationName = ''
    socialProfiles = ''
    organizationLogo = ''
    organizationAddress = ''
# Breadcrumb
    breadcrumbOnPath = false
# Default schema type
    defaultSchema = 'article' # recipe, course are valid too
```

**Front Matter**
```toml
[structured]
    type = 'article' # recipe, course are valid too
# For article
[article.image]
    src = ''
    # ...
# For course
[provider]
    name = ''
    url = ''
# For recipes
[recipe]
    category = ''
    prepTime = ''
    # ...
[recipe.image]
    src = ''
    # ...
[rating]
    value = ''
    # ...
[nutrition]
    servingSize = ''
    # ...
```

# Adding content
```bash
hugo new post/my-post.md
```
## Front Matter
To automatically populate the *Front Matter* with Hugo 0.19, you need to define the theme in use in *config.toml*.
```toml
draft = true
title = "Post title"
slug = "post-title"
tags = ["tag1","tag2"]
categories = ["cat1","cat2"]
image = ""
comments = true # set false to hide Disqus (Disqus is not implemented yet)
menu= ""        # set "main" to add this content to the main menu
author = "" # Use default or author_key from data/authors
noauthor = true # Hides the author on the post

[amp]
    elements = ["amp-social-share"]
    # Adding amp-social-shares enables page sharing. Do not load amp-social-share to disable sharing.
```
## AMP
To have your pages AMP valid, you need to write valid AMP content. To use an AMP element not loaded by default, you need to add it to your content page in the *Front Matter*
```toml
[amp]
    elements = ["amp-image-lightbox", "amp-social-share"]
```

AMP elements can be inserted with shortcodes. Shortcodes for most of the AMP elements have been defined by the [gohugo-amp](https://gohugo-amp.gohugohq.com/shortcodes/) project.
```md
{{< amp-image-lightbox id="myimage" >}}
{{< amp-image
  alt="ALT text"
  src="/images/my-image.png"
  srcset="/images/my-image-small.png 300w, /images/my-image-medium.png 730w, /images/my-image.png 1024w"
  width="300"
  height="300"
>}}
```

# Modifying the theme

## Styles
Styles need to be defined in the header of each page. The stylesheet is a partial in `themes/campser/layouts/partials/styles/stylesheet.html` with it's sources in `themes/campser/layouts/partials/styles-src/styles.scss`. To rebuild the stylesheet, you need to have a working `node`install and install the relevant dependencies.
```bash
cd themes/campser
npm i
npm run build
```
Read the styling section at [GOHUGO AMP](https://gohugo-amp.gohugohq.com/styling/) for more infos.
