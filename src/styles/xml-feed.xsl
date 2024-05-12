<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <title><xsl:value-of select="/rss/channel/title" /></title>
        <!-- {{ styles }} -->
        
        <script type="module">
          const formatter = new Intl.DateTimeFormat(navigator.language, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
          
          document.querySelectorAll('time')?.forEach((time) => {
          const date = new Date(time.textContent);
          time.textContent = formatter.format(date);
          time.setAttribute('datetime', date.toISOString());
          });
        </script>
      </head>
      <body
        class="min-h-full text-lg text-[color:#1f303e] bg-white font-sans antialiased relative"
        >
        
        <div class="w-full max-w-3xl px-4 md:px-8 mx-auto">
          <aside
            class="mt-16 px-4 py-6 border border-l-[5px] rounded border-blue-500/80 bg-sky-50">
            <strong>This is a RSS feed.</strong> Subscribe by copying the URL from the address bar into your newsreader. Visit
            <a
              href="https://aboutfeeds.com"
              target="_blank"
              rel="noopener noreferrer"
              class="cursor-pointer text-blue-500 hocus:underline hocus:underline-offset-4 hocus:decoration-2 touch-manipulation"
              >About Feeds</a>
            to learn more and get started. It&apos;s free.
          </aside>
          
          <main
            aria-labelledby="heading"
            class="mt-16 flex flex-col items-start gap-12"
            >
            <h1 class="flex items-center gap-4 font-bold text-3xl md:text-4xl text-balance">
              <!-- https://commons.wikimedia.org/wiki/File:Feed-icon.svg -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                style="flex-shrink: 0; width: 1em; height: 1em"
                viewBox="0 0 256 256"
                >
                <defs>
                  <linearGradient
                    x1="0.085"
                    y1="0.085"
                    x2="0.915"
                    y2="0.915"
                    id="RSSg"
                    >
                    <stop offset="0.0" stop-color="#E3702D" />
                    <stop offset="0.1071" stop-color="#EA7D31" />
                    <stop offset="0.3503" stop-color="#F69537" />
                    <stop offset="0.5" stop-color="#FB9E3A" />
                    <stop offset="0.7016" stop-color="#EA7C31" />
                    <stop offset="0.8866" stop-color="#DE642B" />
                    <stop offset="1.0" stop-color="#D95B29" />
                  </linearGradient>
                </defs>
                <rect
                  width="256"
                  height="256"
                  rx="55"
                  ry="55"
                  x="0"
                  y="0"
                  fill="#CC5D15"
                  />
                <rect
                  width="246"
                  height="246"
                  rx="50"
                  ry="50"
                  x="5"
                  y="5"
                  fill="#F49C52"
                  />
                <rect
                  width="236"
                  height="236"
                  rx="47"
                  ry="47"
                  x="10"
                  y="10"
                  fill="url(#RSSg)"
                  />
                <circle cx="68" cy="189" r="24" fill="#FFF" />
                <path
                  d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z"
                  fill="#FFF"
                  />
                <path
                  d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z"
                  fill="#FFF"
                  />
              </svg>
              <span class="text-inherit">RSS Feed Preview</span>
            </h1>
            <h2 class="font-bold text-2xl md:text-3xl">
              <xsl:value-of select="/rss/channel/title"/>
            </h2>
            <p><xsl:value-of select="/rss/channel/description"/></p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              class="cursor-pointer text-blue-500 hocus:underline hocus:underline-offset-4 hocus:decoration-2 touch-manipulation">
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link"/>
              </xsl:attribute> Visit Website &#x2192;
            </a>
            
            <section class="flex flex-col gap-12">
              <h2 class="font-bold text-3xl">Recent Items</h2>
              
              <div class="flex flex-col items-start gap-7">
                <xsl:for-each select="/rss/channel/item">
                  <article aria-setsize="-1">
                    <xsl:attribute name="aria-describedby">
                      <xsl:value-of select="slug"/>
                    </xsl:attribute>
                    <xsl:attribute name="aria-labelledby">
                      <xsl:value-of select="slug"/>
                    </xsl:attribute>
                    <xsl:attribute name="aria-posinset">
                      <xsl:value-of select="position()"/>
                    </xsl:attribute>
                    
                    <p class="text-sm text-gray-600">
                      Published on
                      <time><xsl:value-of select="pubDate" /></time>
                    </p>
                    
                    <h3 class="font-bold text-lg">
                      <xsl:attribute name="id">
                        <xsl:value-of select="slug"/>
                      </xsl:attribute>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-hidden=""
                        class="cursor-pointer text-blue-500 hocus:underline hocus:underline-offset-4 hocus:decoration-2 touch-manipulation">
                        <xsl:attribute name="href">
                          <xsl:value-of select="link"/>
                        </xsl:attribute>
                        <xsl:value-of select="title"/>
                      </a>
                    </h3>
                    
                    <p class="text-base">
                      <xsl:value-of select="description" />
                    </p>
                    
                    <footer>
                      <xsl:if test="category">
                        <details>
                          <summary class='text-sm text-gray-600'>Tags</summary>
                          <ul class='flex items-center gap-2 px-4'>
                            <xsl:for-each select="category">
                              <li class='text-sm text-blue-500'>
                                <xsl:value-of select="." />
                              </li>
                            </xsl:for-each>
                          </ul>
                        </details>
                      </xsl:if>
                    </footer>
                  </article>
                </xsl:for-each>
              </div>
            </section>
          </main>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
