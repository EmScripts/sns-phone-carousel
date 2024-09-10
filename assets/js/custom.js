!(function (e) {
  "use strict";
  async function t(t) {
    await dsnGrid.destoryBuild(),
      await a("poster"),
      await a("src"),
      await a("srcset"),
      await void e(".cover-bg, section , [data-image-src]").each(function () {
        var t = e(this).attr("data-image-src");
        void 0 !== t &&
          !1 !== t &&
          e(this).css("background-image", "url(" + t + ")");
      }),
      t ||
        ((window.$effectScroll = await (function () {
          const t = window.Scrollbar;
          var n = document.querySelector("#dsn-scrollbar");
          return {
            start: function () {
              $body.removeClass("locked-scroll"),
                e(".box-view-item .box-img .dsn-scroll-box").each(function () {
                  t.init(this, { damping: 0.06 });
                }),
                this.isScroller(!0) &&
                  (t.init(n, {
                    damping: 0.1,
                    renderByPixels: !0,
                    continuousScrolling: !1,
                    plugins: { overscroll: !0 },
                  }),
                  this.contactForm());
            },
            contactForm: function () {
              const n = e(".contact-modal .contact-container");
              n.length && t.init(n.get(0), { damping: 0.06 });
            },
            isScroller: function (e) {
              e && (n = document.querySelector("#dsn-scrollbar"));
              let t =
                !$body.hasClass("dsn-effect-scroll") ||
                dsnGrid.isMobile() ||
                null === n;
              return t && e && $body.addClass("dsn-mobile"), !t;
            },
            locked: function () {
              if (($body.addClass("locked-scroll"), this.isScroller())) {
                let e = this.getScrollbar();
                void 0 !== e && e.destroy(), (e = null);
              }
            },
            getScrollbar: function (e) {
              return void 0 === e ? t.get(n) : t.get(document.querySelector(e));
            },
            getListener: function (e, t = !0) {
              if (void 0 === e) return;
              let n = this;
              n.isScroller()
                ? n.getScrollbar().addListener(e)
                : t && $wind.on("scroll", e),
                (n = null);
            },
            scrollNavigate: function () {
              let t = e(".wrapper").offset();
              (t = t ? t.top : 0),
                e(".scroll-top , .scroll-to-top").on("click", function () {
                  dsnGrid.scrollTop(0, 2);
                }),
                e(".scroll-d").on("click", function () {
                  dsnGrid.scrollTop(
                    t,
                    2,
                    -1 * e(".scrollmagic-pin-spacer").height() - 200 || -200
                  );
                });
            },
          };
        })()),
        (window.$animate = await (function () {
          const t = Linear.easeNone;
          return {
            allInt: function () {
              this.clearControl()
                .then(() => {
                  this.headerPages();
                })
                .then(() => {
                  this.animations();
                })
                .then(() => {
                  this.parallaxMulti();
                })
                .then(() => {
                  this.parallaxImg();
                })
                .then(() => {
                  this.moveSection();
                })
                .then(() => {
                  this.parallaxImgHover();
                })
                .then(() => {
                  this.nextProject();
                })
                .then(() => {
                  this.dsnScrollTop();
                })
                .then(() => {
                  this.translateSection();
                })
                .then(() => {
                  $effectScroll.scrollNavigate(),
                    $effectScroll.getListener(function (e) {
                      $scene.forEach(function (e) {
                        e.refresh();
                      });
                    });
                });
            },
            clearControl: async function () {
              $controller.destroy(!0),
                ($controller = new ScrollMagic.Controller({
                  refreshInterval: 0,
                }));
              for (let e of $scene) e.destroy(!0), (e = null);
              $scene = [];
            },
            nextProject: function () {
              const t = e(".next-project"),
                n = t.find(".bg-container"),
                i = t.find(".hero-title .title-fill"),
                a = t.find(".intro-project"),
                o = gsap.timeline({ ease: "none" });
              if (t.length)
                if (
                  (n.length &&
                    o.to(n, { width: "100%", height: "100%", left: 0 }, 0),
                  a.length && o.to(a, { top: "50%", yPercent: -50 }, 0),
                  i.length &&
                    (i.css({ transition: "none" }),
                    o.to(
                      i,
                      {
                        clipPath:
                          "polygon(0% 0%, 0% 100%, 55% 100%, 60% 0, 59% 0, 54% 100%, 4% 100%, 50% 100%, 100% 100%, 100% 0%)",
                      },
                      0
                    )),
                  dsnGrid.isMobile())
                ) {
                  dsnGrid
                    .tweenMaxParallax($controller)
                    .addParrlax({ id: t, triggerHook: 1, tween: o });
                } else {
                  const e = dsnGrid.tweenMaxParallax($controller).addParrlax({
                    id: t,
                    triggerHook: 0,
                    duration: 2e3,
                    tween: o,
                    _fixed: !0,
                  });
                  e.on("progress", function (e) {
                    e.progress > 0.998 &&
                      t.find("a").length &&
                      t.find("a")[0].click();
                  }),
                    e && $scene.push(e);
                }
            },
            parallaxImg: async function () {
              let t = this;
              e('[data-dsn-grid="move-up"]').each(function () {
                const n = gsap.timeline({ yoyo: !0 });
                t.tweenImage(e(this), n);
                let i = dsnGrid.tweenMaxParallax($controller).addParrlax({
                  id: this,
                  triggerHook: dsnGrid.getData(this, "triggerhook", 1),
                  duration: dsnGrid.getData(this, "duration", "200%"),
                  tween: n,
                });
                i && $scene.push(i), (i = null);
              });
            },
            tweenImage: function (e, n) {
              let i = e.find("img:not(.hidden) , video");
              if ((e.attr("data-dsn-grid", "moveUp"), i.length > 0)) {
                let a = dsnGrid.getData(i, "speed", "180"),
                  o = { scale: 1, y: 0, yoyo: !0, ease: t, overwrite: "none" };
                gsap.set(
                  i,
                  {
                    height: "+=" + a,
                    y: i.hasClass("has-opposite-direction")
                      ? "+=" + a
                      : "-=" + a,
                  },
                  0
                ),
                  i.hasClass("has-scale") && (o.scale = 1.1),
                  i.css("perspective", e.width() > 1e3 ? 1e3 : e.width()),
                  n.to(i, 1, o, 0);
              }
            },
            parallaxMulti: async function () {
              let t = this;
              e("[data-dsn-animate-multi]").each(function () {
                dsnGrid.getData(this, "animate-multi");
                const n = gsap.timeline({ yoyo: !0, overwrite: "none" });
                e(this)
                  .find('[data-dsn-grid="move-up"]')
                  .each(function () {
                    t.tweenImage(e(this), n);
                  }),
                  e(this)
                    .find('[data-dsn-grid="move-section"]')
                    .each(function () {
                      t.tweenMoveSection.bind(this, n)();
                    });
                let i = dsnGrid.getData(this, "duration", "200%"),
                  a = dsnGrid.getData(this, "triggerhook", 1);
                0 == i && (i = e(this).outerHeight() * (a + 1));
                let o = dsnGrid.tweenMaxParallax($controller).addParrlax({
                  id: this,
                  triggerHook: a,
                  duration: i,
                  tween: n,
                });
                o && $scene.push(o), (o = null);
              });
            },
            animations: async function () {
              let n = this;
              e('[data-dsn-animate="section"]').each(function () {
                dsnGrid.getData(this, "animate");
                const i = {
                  $this: e(this),
                  gsap: gsap.timeline({
                    paused: !0,
                    ease: t,
                    overwrite: "none",
                  }),
                };
                n.animateFade(i, e(this).find(".dsn-up"))
                  .then(() => {
                    n.animateText(i, e(this).find(".dsn-text"));
                  })
                  .then(() => {
                    e(this).find(".line").length && n.animateLine(i);
                  })
                  .then(() => {
                    n.animateSkills(i, e(this).find(".skills-item .fill"));
                  })
                  .then(() => {
                    n.animateNumbers(i, e(this).find(".has-animate-number"));
                  })
                  .then(() => {
                    i.gsap._totalDuration = 1;
                    const t = dsnGrid.tweenMaxParallax().addParrlax({
                      id: this,
                      reverse: !1,
                      triggerHook: 0.5,
                      duration: 0,
                      tween: i.gsap,
                    });
                    i.$this.find(".circular-item .circle").length &&
                      (i.$this.find(".circular-item .circle").circleProgress({
                        size: 160,
                        lineCap: "round",
                        startAngle: -Math.PI,
                        fill: { gradient: ["#fff", "#f7f7f7"] },
                      }),
                      t.on("start", function () {
                        i.$this
                          .find(".circular-item .circle")
                          .circleProgress({})
                          .on("circle-animation-progress", function (t, n) {
                            e(this)
                              .find("h4")
                              .html(
                                Math.round(t.target.dataset.value * n * 100) +
                                  "%"
                              );
                          });
                      }));
                  });
              });
            },
            animateFade: async function (e, t, n = 0) {
              t.length &&
                e.gsap.staggerFromTo(
                  t,
                  0.8,
                  { y: 20, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    delay: n,
                    overwrite: "none",
                    ease: Back.easeOut.config(1.7),
                  },
                  0.2,
                  0
                );
            },
            animateText: function (t, n) {
              n.length &&
                n.each(function () {
                  dsnGrid.convertTextLine(this, "words"),
                    e(this).addClass("overflow-hidden"),
                    t.gsap.staggerFrom(
                      e(this).find(".dsn-word-wrapper"),
                      0.6,
                      {
                        willChange: "transform",
                        transformOrigin: "left",
                        opacity: 0,
                        scaleX: 2,
                        ease: Back.easeOut.config(2),
                      },
                      0.1,
                      0
                    );
                });
            },
            animateLine: function (e, t) {
              e.gsap.addLabel("line", 0),
                e.$this.find(".line.line-top").length &&
                  e.gsap.from(
                    e.$this.find(".line.line-top").toArray(),
                    1,
                    { scaleX: 0, transformOrigin: "right" },
                    "line"
                  ),
                e.$this.find(".line.line-left").length &&
                  e.gsap.from(
                    e.$this.find(".line.line-left").toArray(),
                    1,
                    { scaleY: 0, transformOrigin: "top" },
                    "line+=1"
                  ),
                e.$this.find(".line.line-bottom").length &&
                  e.gsap.from(
                    e.$this.find(".line.line-bottom").toArray(),
                    1,
                    { scaleX: 0, transformOrigin: "left" },
                    "line+=2"
                  ),
                e.$this.find(".line.line-right").length &&
                  e.gsap.from(
                    e.$this.find(".line.line-right").toArray(),
                    1,
                    { scaleY: 0, transformOrigin: "bottom" },
                    "line+=3"
                  );
            },
            animateSkills: function (t, n) {
              n.each(function (n) {
                let i = e(this);
                t.gsap.to(
                  i,
                  1,
                  {
                    width: i.data("width"),
                    onUpdate: function () {
                      i.find(".number").text(
                        ((i.width() / i.parent().width()) * 100).toFixed(0) +
                          "%"
                      );
                    },
                    onComplete: function () {
                      i = null;
                    },
                  },
                  0.2 * n
                );
              });
            },
            animateNumbers: function (t, n) {
              t.gsap.addLabel("number", 0),
                n.each(function (n) {
                  let i = e(this),
                    a = i.text(),
                    o = { value: 0 };
                  i.text("0"),
                    t.gsap.to(
                      o,
                      4,
                      {
                        value: a,
                        ease: Back.easeOut.config(1.2),
                        onUpdate: function () {
                          i.text(dsnGrid.numberText(o.value.toFixed(0)));
                        },
                        onComplete: function () {
                          i = o = null;
                        },
                      },
                      "number+=" + 0.2 * n
                    );
                });
            },
            headerPages: function () {
              e(".dsn-header-animation").each(function () {
                let n = e(this),
                  i = n.find(".dsn-hero-parallax-img"),
                  a = n.find(".dsn-hero-parallax-fill"),
                  o = a.find(".title-fill"),
                  s = n.find(".dsn-hero-parallax-title");
                const r = gsap.timeline();
                i.length &&
                  r.to(
                    i,
                    { y: "30%", yoyo: !0, ease: t, overwrite: "none" },
                    0
                  ),
                  a.length &&
                    (r.to(a, { yPercent: 100, autoAlpha: 0 }, 0),
                    o.length &&
                      r.to(
                        o,
                        {
                          clipPath:
                            "polygon(0% 0%, 0% 100%, 55% 100%, 60% 0, 59% 0, 54% 100%, 4% 100%, 50% 100%, 100% 100%, 100% 0%)",
                        },
                        0
                      )),
                  s.length &&
                    r.to(
                      s,
                      {
                        y: "-15%",
                        autoAlpha: 0,
                        yoyo: !0,
                        ease: t,
                        overwrite: "none",
                      },
                      0
                    );
                let l = dsnGrid.tweenMaxParallax($controller).addParrlax({
                  id: this,
                  triggerHook: 0,
                  duration: "100%",
                  tween: r,
                });
                l && $scene.push(l), (l = i = n = void 0);
              });
            },
            moveSection: function () {
              let t = this;
              e('[data-dsn-grid="move-section"]').each(function () {
                let n = e(this);
                const i = gsap.timeline({ yoyo: !0 });
                t.tweenMoveSection.bind(this, i)();
                const a = dsnGrid.tweenMaxParallax($controller).addParrlax({
                  id: this,
                  triggerHook: dsnGrid.getData(n, "triggerhook", 1),
                  duration: dsnGrid.getData(n, "duration", "150%"),
                  tween: i,
                });
                $scene.push(a), (n = null);
              });
            },
            tweenMoveSection: function (n) {
              let i = e(this);
              dsnGrid.getData(this, "grid"),
                i.addClass("dsn-move-section"),
                ("tablet" === dsnGrid.getData(this, "responsive") &&
                  dsnGrid.isMobile()) ||
                  n.to(
                    i,
                    1,
                    {
                      y: dsnGrid.getData(i, "move", -150),
                      autoAlpha: dsnGrid.getData(
                        i,
                        "opacity",
                        i.css("opacity")
                      ),
                      ease: t,
                      yoyo: !0,
                      overwrite: "none",
                    },
                    0
                  );
            },
            parallaxImgHover: function () {
              dsnGrid.isMobile() ||
                e('[data-dsn="parallax"]').each(function () {
                  let t = e(this);
                  t.removeAttr("data-dsn"),
                    dsnGrid.parallaxMoveElement(
                      t,
                      dsnGrid.getData(t, "move", 20),
                      dsnGrid.getData(t, "speed", 0.5),
                      t.find(".dsn-parallax-rev").get(0),
                      t.hasClass("image-zoom")
                    ),
                    (t = null);
                });
            },
            dsnScrollTop: function () {
              const t = e(".wrapper");
              if (!t.length || !e(".scroll-to-top").length) return;
              gsap.to(".scroll-to-top", 1, { right: -100, autoAlpha: 0 });
              const n = dsnGrid.tweenMaxParallax($controller).addParrlax({
                id: t,
                triggerHook: t.offset().top > 50 ? 0.5 : 0,
                offset: t.offset().top > 50 ? 0 : 100,
                duration:
                  t.height() -
                  0.5 * $wind.height() +
                  (e(".next-project").outerHeight() || 0) -
                  (t.offset().top > 50 ? 0 : 300),
                tween: gsap.to(".scroll-to-top > img", 0.3, {
                  rotation: t.height() / 2,
                }),
              });
              n.on("progress", function (t) {
                e(".scroll-to-top .box-number span").text(
                  (100 * t.progress).toFixed(0) + "%"
                );
              }),
                n.on("enter", function () {
                  gsap.to(".scroll-to-top", 1, { right: 10, autoAlpha: 1 });
                }),
                n.on("leave", function () {
                  gsap.to(".scroll-to-top", 1, { right: -100, autoAlpha: 0 });
                }),
                n && $scene.push(n);
            },
            translateSection: function () {
              e(
                ".section-image.section-move-image .transform-move-section"
              ).each(function () {
                const t = gsap.timeline();
                let n = 0;
                e(this)
                  .find(".swiper-slide")
                  .each(function () {
                    n += e(this).outerWidth();
                  }),
                  e(this).append(e(this).find(".swiper-slide").clone()),
                  e(this).append(e(this).find(".swiper-slide").clone()),
                  (n -= e(this).width()),
                  e(this).hasClass("move-left")
                    ? t.to(this, { x: -1 * n })
                    : t.from(this, { x: -1 * n });
                let i = dsnGrid.tweenMaxParallax($controller).addParrlax({
                  id: this,
                  triggerHook: dsnGrid.getData(this, "triggerhook", 1),
                  duration: dsnGrid.getData(this, "duration", "200%"),
                  tween: t,
                });
                i && $scene.push(i);
              });
            },
          };
        })()),
        await (function () {
          const t = e(".site-header");
          return {
            init: function () {
              if (!t.length) return;
              this.cutterText(), this.hamburgerOpen();
            },
            cutterText: function () {
              let e = t.find(".menu-icon .text-menu");
              if (e.length <= 0) return;
              let n = e.find(".text-button"),
                i = e.find(".text-open"),
                a = e.find(".text-close");
              dsnGrid.convertTextLine(n),
                dsnGrid.convertTextLine(i),
                dsnGrid.convertTextLine(a),
                (a = null),
                (i = null),
                (n = null),
                (e = null);
            },
            hamburgerOpen: function () {
              const n = t.find(".menu-icon"),
                i = t.find(".main-navigation");
              let a = gsap.timeline({
                paused: !0,
                onReverseComplete: function () {
                  setTimeout(function () {
                    n.find(".icon-top , .icon-bottom")
                      .css("transform", "")
                      .css("display", "");
                  }, 50),
                    console.log("onReverseComplete : tl");
                },
              });
              var o = gsap.timeline({
                onReverseComplete: function () {
                  (o = gsap.timeline()),
                    console.log("onReverseComplete : menuClick");
                },
              });
              let s = Power3.easeOut;
              a.set(n.find(".icon-center"), { display: "none" }),
                a.to(n.find(".icon-top"), 0.5, {
                  width: 23,
                  rotation: 45,
                  top: 0,
                  ease: s,
                }),
                a.to(
                  n.find(".icon-bottom"),
                  0.5,
                  { width: 23, rotation: -45, top: 0, ease: s },
                  0
                ),
                a.call(function () {
                  n.toggleClass("nav-active");
                }, 0),
                a.to(i, 0.5, { y: "0%", autoAlpha: 1, ease: s }, 0),
                a.fromTo(
                  i,
                  0.5,
                  { y: "-100%", autoAlpha: 0 },
                  { y: "0%", autoAlpha: 1, ease: Expo.easeInOut },
                  0
                ),
                a.staggerTo(
                  i.find("ul.extend-container > li > a .dsn-title-menu"),
                  0.5,
                  { autoAlpha: 1, y: 0, ease: Back.easeOut.config(1.7) },
                  0.05
                ),
                a.set(i.find("ul.extend-container > li > a .dsn-meta-menu"), {
                  autoAlpha: 1,
                  ease: s,
                }),
                a.to(i.find(".container-content"), 1, { autoAlpha: 1 }, "-=1"),
                a.reverse(),
                i
                  .find("ul.extend-container > li.dsn-drop-down")
                  .on("click", function (t) {
                    t.stopPropagation(),
                      o._tDur > 0 ||
                        ((o = gsap.timeline({
                          onReverseComplete: function () {
                            o = gsap.timeline();
                          },
                        })).set(e(this).find("ul"), { display: "flex" }),
                        o.to(
                          i
                            .find("ul.extend-container > li > a ")
                            .find(".dsn-title-menu , .dsn-meta-menu"),
                          0.5,
                          {
                            y: -30,
                            autoAlpha: 0,
                            ease: Back.easeIn.config(1.7),
                          }
                        ),
                        o.set(
                          ".site-header .extend-container .main-navigation ul.extend-container li",
                          { overflow: "hidden" }
                        ),
                        o.staggerFromTo(
                          e(this).find("ul li"),
                          0.5,
                          { x: 50, autoAlpha: 0 },
                          {
                            x: 0,
                            autoAlpha: 1,
                            ease: Back.easeOut.config(1.7),
                          },
                          0.1
                        ));
                  }),
                n.off("click"),
                n.on("click", function () {
                  console.log("mainIcon:click"),
                    a.isActive() ||
                      (o.reverse(-1),
                      a.reversed(!a.reversed()),
                      (o = gsap.timeline()));
                });
              let r = e(".dsn-back-menu");
              r.off("click"),
                r.on("click", function (e) {
                  console.log("backMenu:click"),
                    e.stopPropagation(),
                    o.reverse();
                });
            },
          };
        })().init(),
        await dsnGrid.removeWhiteSpace(
          ".site-header ul.extend-container li > a"
        ),
        await (function () {
          const t = e(".box-options");
          t.find(".title-mode").each(function () {
            dsnGrid.convertTextLine(this);
          }),
            t.find(".day-night").on("click", function () {
              const t = e(".v-dark"),
                n = e(".v-light");
              $body.toggleClass("v-dark"),
                t.removeClass("v-dark").addClass("v-light"),
                n.addClass("v-dark").removeClass("v-light");
            }),
            t.find(".mode-layout").on("click", function () {
              $body.toggleClass("dsn-line-style");
              for (let e of $build.swiper) e.update();
              o();
            });
        })()),
      t &&
        (await s(t),
        setTimeout(function () {
          e(".twentytwenty").twentytwenty();
        }, 500)),
      e("a.vid").YouTubePopUp(),
      await $effectScroll.start(),
      await (function () {
        $wind.off("scroll");
        // var for main-logo
        var lightlogo = e(".light-logo");
        var darklogo = e(".dark-logo");
        const t = e(".wrapper");
        let n = 0;
        var i = t.offset(),
          a = t.find("> *:first-child"),
          o = 0;
        a.length &&
          (i =
            "HEADER" === a.get(0).nodeName
              ? a.outerHeight()
              : void 0 !== i
              ? i.top
              : 70);
        $effectScroll.getListener(function (e) {
          (n = "scroll" === e.type ? $wind.scrollTop() : e.offset.y),
            i > 170 && (i -= 100),
            n > i
              ? o < n
              // on load show dark logo
                ? ($body.addClass("nav-bg").addClass("hide-nav"),
                  lightlogo.addClass("hide-item"),
                  darklogo.addClass("show"))
                : ($body.removeClass("hide-nav"),
                  lightlogo.removeClass("hide-item"),
                  darklogo.removeClass("show"))
              : ($body.removeClass("nav-bg").removeClass("hide-nav"),
                lightlogo.addClass("hide-item"),
                darklogo.addClass("show")),
            (o = n);
        });
      })(),
      await $animate.allInt(),
      await (function () {
        const t = e(".dsn-slider");
        let n = gsap.timeline();
        return {
          run: async function () {
            let i = this;
            t.each(function () {
              let a = e(this),
                o = a.hasClass("has-horizontal"),
                s = a.find(".slide-inner");
              s.hasClass("dsn-webgl")
                ? i.initWebgel(e(this)).then((e) => {
                    t
                      .find(".control-nav .slider-total-index")
                      .html(dsnGrid.numberText(e.imgs.length)),
                      dsnGrid.WebGLDistortionHoverEffects(e, {
                        parent: s,
                        vertical: !o,
                        nextEl: t.find(".next-container"),
                        prevEl: t.find(".prev-container"),
                        onComplete: function () {},
                        onStart: function (e, n) {
                          i.slideChangeWeb(
                            t,
                            o ? "x" : "y",
                            e,
                            n,
                            this.mat.uniforms.effectFactor.value < 0
                          );
                        },
                      });
                  })
                : s.find(".slide-item").length &&
                  i.initSlider(a).then(function (e) {
                    const t = i.swiperObject(a, !o);
                    i.slideChange(t, a, o ? "x" : "y"),
                      dsnGrid.addSwiper(t),
                      a.find(".next-container").on("click", function () {
                        n.isActive() || t.slideNext();
                      }),
                      a.find(".prev-container").on("click", function () {
                        n.isActive() || t.slidePrev();
                      });
                    const s = a.find(".next-slide-box");
                    if (!s.length) return;
                    const r = new Swiper(s.get(0), {
                      speed: 1e3,
                      touchRatio: 0.2,
                      resistanceRatio: 0.65,
                      spaceBetween: 0,
                      effect: "fade",
                    });
                    (t.controller.control = r), (r.controller.control = t);
                  });
            });
          },
          initSlider: async function (t) {
            t.find(".slide-item").each(function (n) {
              let i = e(this);
              i.attr("data-dsn-id", n);
              let a = e(this).find(".slide-content");
              a.attr("data-dsn-id", n),
                0 === n && a.addClass("dsn-active dsn-active-cat"),
                t.find(".dsn-slider-content > .dsn-container").append(a);
              let o = a.find(".title");
              o.find("a").length && (o = o.find("a")),
                dsnGrid.convertTextLine(o),
                (i = a = o = null);
            });
          },
          swiperObject: function (t, n = !0) {
            return new Swiper(t.find(".slide-inner").get(0), {
              speed: 1e3,
              grabCursor: !0,
              allowTouchMove: !0,
              direction: n ? "vertical" : "horizontal",
              slidesPerView: 1,
              parallax: !0,
              loopAdditionalSlides: 10,
              watchSlidesProgress: !0,
              watchSlidesVisibility: !0,
              pagination: {
                el: t.find("span.slider-current-index").get(0),
                type: "custom",
                clickable: !0,
                renderCustom: function (e, n, i) {
                  return (
                    gsap.to(
                      t.find(".progress-nav .progress-w .progress-w-affter"),
                      1,
                      { width: (n / i) * 100 + "%" }
                    ),
                    dsnGrid.numberText(n)
                  );
                },
              },
              on: {
                init: function () {
                  this.autoplay.stop();
                  let n = this;
                  t.find('[data-dsn="video"] video').each(function () {
                    this.pause();
                  }),
                    (this.touchEventsData.formElements = "*"),
                    t.find("[data-swiper-parallax]").each(function () {
                      let t = e(this)
                        .attr("data-swiper-parallax")
                        .replace("%", "");
                      e(this).attr({
                        "data-swiper-parallax": (t / 100) * n.width,
                      });
                    });
                },
                touchStart: function () {
                  e(this.slides).css("transition", ""),
                    !dsnGrid.isMobile() &&
                      $body.hasClass("dsn-cursor-effect") &&
                      (e(this.slides)
                        .parents(".main-slider")
                        .hasClass("has-horizontal")
                        ? e(".cursor").addClass(
                            "cursor-scale-half cursor-drag cursor-next cursor-prev"
                          )
                        : e(".cursor").addClass(
                            "cursor-scale-half cursor-up-down cursor-drag cursor-next cursor-prev"
                          ));
                },
                touchEnd: function () {
                  !dsnGrid.isMobile() &&
                    $body.hasClass("dsn-cursor-effect") &&
                    (e(this.slides).hasClass("has-horizontal")
                      ? e(".cursor").removeClass(
                          "cursor-scale-half cursor-drag cursor-next cursor-prev"
                        )
                      : e(".cursor").removeClass(
                          "cursor-scale-half cursor-up-down cursor-drag cursor-next cursor-prev"
                        ));
                },
              },
            });
          },
          slideChange: function (t, i, a) {
            let o = this;
            t.on("slideChange", async function () {
              let s = i.find(".dsn-slider-content .dsn-active"),
                r = s.data("dsn-id"),
                l = e(t.slides[t.activeIndex]),
                d = l.data("dsn-id");
              if (r === d) return;
              i.find('[data-dsn="video"] video').each(function () {
                this.pause();
              });
              let c = e(this.slides[this.activeIndex]).find(
                '[data-dsn="video"] video'
              );
              c.length && c.get(0).play();
              let f = s.find(".dsn-chars-wrapper");
              s.removeClass("dsn-active-cat");
              let u = i.find('.dsn-slider-content [data-dsn-id="' + d + '"]'),
                h = u.find(".dsn-chars-wrapper"),
                p = r > d;
              n.progress(1),
                (n = new gsap.timeline()),
                n.staggerFromTo(
                  p ? f.toArray().reverse() : f,
                  0.3,
                  o.showText(a).title,
                  o.hideText(p, a).title,
                  0.05,
                  0,
                  function () {
                    i
                      .find(".dsn-slider-content .slide-content")
                      .removeClass("dsn-active")
                      .removeClass("dsn-active-cat"),
                      u.addClass("dsn-active"),
                      u.addClass("dsn-active-cat");
                  }
                ),
                n.staggerFromTo(
                  p ? h.toArray().reverse() : h,
                  0.8,
                  o.hideText(!p, a).title,
                  o.showText(a).title,
                  0.05,
                  "-=.1"
                ),
                (s = r = l = d = c = f = h = p = null);
            });
          },
          slideChangeWeb: function (e, t, i, a, o) {
            e.find(".control-nav .slider-current-index").html(
              dsnGrid.numberText(i + 1)
            );
            let s = e
                .find(".dsn-slider-content .dsn-active")
                .find(".dsn-chars-wrapper"),
              r = e.find('.dsn-slider-content [data-dsn-id="' + i + '"]'),
              l = r.find(".dsn-chars-wrapper");
            e.find(".slide-inner").attr("data-overlay", r.data("overlay")),
              n.progress(1),
              (n = new gsap.timeline()),
              n.staggerFromTo(
                o ? s.toArray().reverse() : s,
                0.3,
                this.showText(t).title,
                this.hideText(o, t).title,
                0.05,
                0,
                function () {
                  e
                    .find(".dsn-slider-content .slide-content")
                    .removeClass("dsn-active")
                    .removeClass("dsn-active-cat"),
                    r.addClass("dsn-active"),
                    r.addClass("dsn-active-cat");
                }
              ),
              n.staggerFromTo(
                o ? l.toArray().reverse() : l,
                0.8,
                this.hideText(!o, t).title,
                this.showText(t).title,
                0.05,
                "-=.1"
              );
          },
          showText: function (e) {
            let t = {
              title: { autoAlpha: 1, scale: 1, ease: "back.out(4)", yoyo: !0 },
            };
            return (t.title[e] = "0%"), t;
          },
          hideText: function (e, t) {
            let n = { title: { autoAlpha: 0, ease: "back.in(4)", yoyo: !0 } };
            return (n.title[t] = e ? "40%" : "-40%"), n;
          },
          initWebgel: async function (t) {
            let n = [],
              i = [];
            return (
              t.find(".dsn-slider-content .slide-content").each(function (t) {
                let a = e(this);
                (n[t] = a.data("webgel-src")),
                  (i[t] = a.data("overlay")),
                  a.attr("data-dsn-id", t),
                  0 === t && a.addClass("dsn-active dsn-active-cat");
                let o = a.find(".title a");
                dsnGrid.convertTextLine(o), (a = o = null);
              }),
              t.find(".slide-inner").attr("data-overlay", i[0]),
              {
                imgs: n,
                overlay: i,
                displacement: dsnGrid.getData(
                  t.find(".slide-inner"),
                  "displacement",
                  "assets/img/displacement/8.jpg"
                ),
                intensity: dsnGrid.getData(
                  t.find(".slide-inner"),
                  "intensity",
                  -2
                ),
                speedIn: dsnGrid.getData(
                  t.find(".slide-inner"),
                  "speedIn",
                  1.2
                ),
                speedOut: dsnGrid.getData(
                  t.find(".slide-inner"),
                  "speedOut",
                  1.2
                ),
                easing: dsnGrid.getData(
                  t.find(".slide-inner"),
                  "easing",
                  "Expo.easeInOut"
                ),
              }
            );
          },
        };
      })().run(),
      await o(),
      await {
        swiper: function (t, n) {
          (t = dsnGrid.convertToJQuery(t)),
            (n = e.extend(
              !0,
              {
                slidesPerView: 1,
                centeredSlides: !0,
                spaceBetween: 0,
                grabCursor: !0,
                speed: 1e3,
                parallax: !0,
                loop: !0,
                slideToClickedSlide: !0,
                pagination: {
                  el: t.find(".swiper-pagination").get(0),
                  dynamicBullets: !0,
                  clickable: !0,
                  renderBullet: function (e, t) {
                    return (
                      '<span class="' +
                      t +
                      ' swiper-pagination-bullet--svg-animation"><svg width="26" height="26" viewBox="0 0 28 28"><circle class="svg__circle" cx="14" cy="14" r="12" fill="none" stroke-width="2"></circle><circle class="svg__circle-inner" cx="14" cy="14" r="6" stroke-width="3"></circle></svg></span>'
                    );
                  },
                },
                navigation: {
                  nextEl: t.find(".swiper-next").get(0),
                  prevEl: t.find(".swiper-prev").get(0),
                },
              },
              n
            ));
          let i = new Swiper(t.find(".swiper-container").get(0), n);
          dsnGrid.addSwiper(i);
        },
        run: function () {
          let t = this;
          e(".dsn-swiper").each(function () {
            let n = dsnGrid.getData(this, "option", {}),
              i = e(this).parent().find(dsnGrid.getData(this, "controller"));
            i.length &&
              (n.thumbs = {
                swiper: {
                  el: i.find(".swiper-container").get(0),
                  allowTouchMove: !1,
                  slidesPerView: 1,
                  speed: n.speed || 1e3,
                  parallax: !0,
                  autoHeight: !0,
                },
              }),
              // SWIPER BREAKPOINTS
              (n.breakpoints = {
                // when window width is >= 768px
                768: {
                  slidesPerView:
                    n.slidesPerView > 1 ? (n.slidesPerView > 1.5 ? 2 : 1.3) : 1,
                  spaceBetween:
                    n.slidesPerView > 1
                      ? n.spaceBetween > 21
                        ? 20
                        : n.spaceBetween
                      : 0,
                },
                // when window width is >= 992px
                992: {
                  slidesPerView: n.slidesPerView,
                  spaceBetween: n.spaceBetween || 20,
                },
                // when window width is >= 320px
                575: { slidesPerView: 1, spaceBetween: 20 },
              }),
              i.length &&
                (n.thumbs = {
                  swiper: {
                    el: i.find(".swiper-container").get(0),
                    allowTouchMove: !1,
                    slidesPerView: 1,
                    speed: n.speed || 1e3,
                    parallax: !0,
                    autoHeight: !0,
                  },
                }),
                // ,
                // (n.breakpoints[768] = { slidesPerView: 1, spaceBetween: 0 })
              (n.slidesPerView = 1),
              (n.spaceBetween = 0),
              t.swiper(this, n);
          });
        },
      }.run(),
      await void e(".dsn-accordion").each(function () {
        let t = e(this),
          n = t.find(".accordion__question");
        n.on("click", function () {
          let i = e(this).next();
          t.find(".accordion__answer").not(i).slideUp(400),
            n.not(this).removeClass("expanded"),
            e(this).toggleClass("expanded"),
            i.slideToggle(400),
            (i = null);
        });
      }),
      await (function () {
        let t = e(".map-custom");
        if (!t.length) return void (t = null);
        if (!e("#map_api").length) {
          let e = "AIzaSyA5bpEs3xlB8vhxNFErwoo3MXR64uavf6Y",
            t = document.createElement("script");
          (t.type = "text/javascript"),
            (t.id = "map_api"),
            (t.src = "https://maps.googleapis.com/maps/api/js?key=" + e),
            document.body.appendChild(t),
            (e = t = null);
        }
        setTimeout(function () {
          try {
            let e = t.data("dsn-lat"),
              n = t.data("dsn-len"),
              i = t.data("dsn-zoom"),
              a = new google.maps.LatLng(e, n),
              o = new google.maps.Map(t.get(0), {
                center: { lat: e, lng: n },
                mapTypeControl: !1,
                scrollwheel: !1,
                draggable: !0,
                streetViewControl: !1,
                navigationControl: !1,
                zoom: i,
                styles: [
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
                  },
                  {
                    featureType: "landscape",
                    elementType: "geometry",
                    stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#ffffff" }, { lightness: 17 }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [
                      { color: "#ffffff" },
                      { lightness: 29 },
                      { weight: 0.2 },
                    ],
                  },
                  {
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [{ color: "#ffffff" }, { lightness: 18 }],
                  },
                  {
                    featureType: "road.local",
                    elementType: "geometry",
                    stylers: [{ color: "#ffffff" }, { lightness: 16 }],
                  },
                  {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
                  },
                  {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{ color: "#dedede" }, { lightness: 21 }],
                  },
                  {
                    elementType: "labels.text.stroke",
                    stylers: [
                      { visibility: "on" },
                      { color: "#ffffff" },
                      { lightness: 16 },
                    ],
                  },
                  {
                    elementType: "labels.text.fill",
                    stylers: [
                      { saturation: 36 },
                      { color: "#333333" },
                      { lightness: 40 },
                    ],
                  },
                  {
                    elementType: "labels.icon",
                    stylers: [{ visibility: "off" }],
                  },
                  {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
                  },
                  {
                    featureType: "administrative",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#fefefe" }, { lightness: 20 }],
                  },
                  {
                    featureType: "administrative",
                    elementType: "geometry.stroke",
                    stylers: [
                      { color: "#fefefe" },
                      { lightness: 17 },
                      { weight: 1.2 },
                    ],
                  },
                ],
              });
            google.maps.event.addDomListener(window, "resize", function () {
              let e = o.getCenter();
              google.maps.event.trigger(o, "resize"),
                o.setCenter(e),
                (e = null);
            }),
              new google.maps.Marker({
                position: a,
                animation: google.maps.Animation.BOUNCE,
                icon: "assets/img/map-marker.png",
                title: "ASL",
                map: o,
              }),
              (e = n = i = a = null);
          } catch (e) {
            console.log(e);
          }
        }, 500);
      })(),
      await (async function () {
        const t = e(".dsn-paginate-right-page");
        if (!t.length) return;
        t.empty(),
          e("[data-dsn-title]").each(function () {
            const n = dsnGrid.getData(this, "title"),
              i = e(this).offset().top,
              a = e(
                '<div class="dsn-link-paginate text-transform-upper"></div>'
              );
            a.html(n),
              t.append(a),
              a.on("click", function () {
                dsnGrid.scrollTop(i, 1, -150);
              });
          });
      })(),
      await (function () {
        let t = {
          delegate: "a:not(.effect-ajax)",
          type: "image",
          closeOnContentClick: !1,
          closeBtnInside: !1,
          mainClass: "mfp-with-zoom",
          gallery: { enabled: !0 },
          zoom: {
            enabled: !0,
            duration: 400,
            easing: "cubic-bezier(0.36, 0, 0.66, -0.56)",
            opener: function (e) {
              return e.find("img");
            },
          },
          callbacks: {
            open: function () {
              e("html").css({ margin: 0 });
            },
          },
        };
        e(".gallery-portfolio").each(function () {
          e(this).magnificPopup(t);
        }),
          e(".has-popup .pop-up").length && (t.delegate = "a.pop-up");
        e(".has-popup").magnificPopup(t);
      })(),
      await void e(".gallery-portfolio").each(function () {
        e(this).justifiedGallery({ rowHeight: 370, margins: 15 });
      }),
      await (function () {
        const t = e("#contact-form");
        if (t < 1) return;
        t.validator(),
          t.off("submit"),
          t.on("submit", function (n) {
            if (!n.isDefaultPrevented())
              return (
                e.ajax({
                  type: "POST",
                  url: "contact.php",
                  data: e(this).serialize(),
                  async: false,
                  contentType: "application/x-www-form-urlencoded",
                  success: function (response) {
                    if (response.status === "success") {
                      $(".msg-danger").removeClass("show");
                      $(".msg-success").addClass("show");
                    } else {
                      $(".msg-success").removeClass("show");
                      $(".msg-danger").addClass("show");
                    }
                  },
                  error: function (error) {
                    $(".msg-success").removeClass("show");
                    $(".msg-danger").addClass("show");
                  },
                }),
                !1
              );
          });
      })(),
      await (function () {
        const t = e("#newsletter-form");
        if (t < 1) return;
        t.validator(),
          t.off("submit"),
          t.on("submit", function (n) {
            if (!n.isDefaultPrevented())
              return (
                e.ajax({
                  type: "POST",
                  url: "newsletter.php",
                  data: e(this).serialize(),
                  async: false,
                  contentType: "application/x-www-form-urlencoded",
                  success: function (response) {
                    if (response.status === "success") {
                      $(".msg-danger").removeClass("show");
                      $(".msg-success").addClass("show");
                    } else {
                      $(".msg-success").removeClass("show");
                      $(".msg-danger").addClass("show");
                    }
                  },
                  error: function (error) {
                    $(".msg-success").removeClass("show");
                    $(".msg-danger").addClass("show");
                  },
                }),
                !1
              );
          });
      })(),
      await void e(".features > .list-features").each(function () {
        e(this)
          .find(".list-item")
          .on("mouseenter", function () {
            e(this).addClass("active").siblings().removeClass("active");
          });
      }),
      await n().ajaxLoad(),
      await (e('a[href="#"]').on("click", function (e) {
        e.preventDefault();
      }),
      e('[href*="#"]:not([href="#"])').on("click", function (t) {
        t.preventDefault();
        let n = e(e(this).attr("href"));
        if (!n.length) return (n = null), !1;
        dsnGrid.scrollTop(n.get(0).offsetTop, 1, -100), (n = null);
      }),
      void (
        window.location.hash.length &&
        ($wind.scrollTop(0), dsnGrid.scrollTop(window.location.hash, 1, -100))
      ));
  }
  function n() {
    var n,
      i,
      a = gsap.timeline();
    return {
      ajaxLoad: function () {
        if (!$body.hasClass("dsn-ajax")) return;
        let t = this;
        this.ajaxClick.off("click"),
          this.ajaxClick.on("click", function (n) {
            n.preventDefault();
            let i = e(this),
              o = i.attr("href"),
              s = i.data("dsn-ajax");
            o.indexOf("#") >= 0 || void 0 === o
              ? (i = o = s = null)
              : t.effectAjax() ||
                (t.effectAjax(!0),
                e.ajax({
                  url: o,
                  dataType: "html",
                  beforeSend: t.animateAjaxStart.bind(t, s, i),
                  success: function (e) {
                    try {
                      history.pushState(null, "", o),
                        a.call(
                          t.animateAjaxEnd.bind(t, e),
                          null,
                          null,
                          "+=0.2"
                        );
                    } catch (e) {
                      window.location = o;
                    }
                  },
                  error: function (e) {
                    window.location = o;
                  },
                }));
          });
      },
      mainRoot: e("main.main-root"),
      ajaxClick: e("a.effect-ajax "),
      effectAjax: function (e) {
        if (e) $body.addClass("dsn-ajax-effect");
        else {
          if (!1 !== e) return $body.hasClass("dsn-ajax-effect");
          $body.removeClass("dsn-ajax-effect");
        }
      },
      animateAjaxStart: function (e, t) {
        switch (
          (a.clear(),
          a.addLabel("beforeSend"),
          dsnGrid.isMobile() && "next" === e && (e = void 0),
          e)
        ) {
          case "slider":
            this.ajaxSlider(t);
            break;
          case "next":
            this.ajaxNextProject(t);
            break;
          case "work":
            this.ajaxWork(t);
            break;
          case "work-slider":
            this.ajaxWorkSwiper(t);
            break;
          case "work-hover":
            this.ajaxWorkHover(t);
            break;
          default:
            this.ajaxNormal();
        }
        "next" !== e &&
          ($effectScroll.locked(),
          a.call(function () {
            dsnGrid.scrollTop(0, 0.01);
          }));
      },
      ajaxNormal: function () {
        let t = e('<div class="dsn-ajax-loader dsn-ajax-normal"></div>');
        $body.append(t),
          a.to(t, 1, { autoAlpha: 1, ease: Expo.easeOut }, 0),
          (t = null);
      },
      ajaxSlider: function (t) {
        let n = t.parents(".slide-content"),
          i = n.data("dsn-id"),
          a = n
            .parents(".dsn-slider")
            .find('.slide-item[data-dsn-id="' + i + '"] .image-bg')
            .first(),
          o = n.find(".title"),
          s = n.parents(".dsn-slider").find(".bg-container");
        a.removeClass("hidden"),
          n.data("webgel-src") &&
            (a = e("<div class='cover-bg'></div>").attr({
              "data-overlay": s.find(".dsn-webgl").data("overlay"),
              style: 'background-image:url("' + n.data("webgel-src") + '")',
            })),
          this.dsnCreateElement(a, s, o, o, {
            before: function (e, t, n) {
              gsap.set(t, { height: "-=" + s.css("padding-bottom") });
            },
          });
      },
      ajaxNextProject: function (e) {
        const t = e.parents(".next-project"),
          n = t.find(".bg-container"),
          i = e,
          o = window.Scrollbar.get(document.querySelector("#dsn-scrollbar"));
        a.to(o || $wind, 1, {
          scrollTo: {
            y: o
              ? $effectScroll.getScrollbar().limit.y
              : document.body.scrollHeight,
          },
        }),
          a.call(
            this.dsnCreateElement.bind(
              this,
              n,
              t,
              i.find(".title.title-fill"),
              i
            )
          );
      },
      ajaxWork: function (e) {
        let t = e.parents(".work-item"),
          i = t.find(".img-next-box"),
          o = t.find(".sec-title");
        this.dsnCreateElement(i, i, o, o),
          a.to(n.find("img"), 0.5, { height: "100%", top: "0%", y: "0" }),
          (t = i = o = null);
      },
      ajaxWorkSwiper: function (e) {
        let t = e.parents(".content-item"),
          i = t.find(".sec-title"),
          o = t
            .parents(".last-project-section")
            .find(".bg-project .swiper-slide-active .bg-item");
        this.dsnCreateElement(o, o, i, i),
          a.to(n.find("img"), 0.5, { height: "100%", top: "0%", y: "0" }),
          (t = o = i = null);
      },
      ajaxWorkHover: function (e) {
        let t = e,
          n = t.find(".hover-reveal"),
          i = t.find(".work__item-text");
        this.dsnCreateElement(n.find(".hover-reveal__img"), n, i, i),
          (t = n = i = null);
      },
      addElement: function (e, t, n) {
        if (void 0 === t || t.length <= 0) return;
        (void 0 === n || n.length <= 0) && (n = t),
          t.removeClass("line-after").removeClass("line-before");
        let i = t.clone(),
          a = n[0].getBoundingClientRect();
        return (
          void 0 === a && (a = { left: 0, top: 0 }),
          i.css({
            position: "fix",
            display: "block",
            transform: "",
            transition: "",
            objectFit: "cover",
          }),
          i.css(dsnGrid.getBoundingClientRect(n[0])),
          i.css(t.dsnGridStyleObject()),
          e.append(i),
          i
        );
      },
      dsnCreateElement: function (t, o, s, r, l = {}) {
        let d = e('<div class="dsn-ajax-loader"></div>');
        (n = this.addElement(d, t, o)),
          (i = this.addElement(d, s, r)).find(".dsn-chars-wrapper").length ||
            dsnGrid.convertTextLine(i),
          n.css("z-index", 1),
          i.css("z-index", 2),
          void 0 !== l.before && l.before(d, n, i),
          $body.append(d),
          a.to(d, 1, { autoAlpha: 1, ease: Power4.easeInOut }, "-=0.8"),
          void 0 !== l.after && l.after(d, n, i);
      },
      completeElement: function (t) {
        let o = e('[data-dsn-ajax="img"]'),
          s = e('[data-dsn-ajax="title"]'),
          r = e(".dsn-hero-parallax-fill .title.title-fill");
        if (!o.length && !s.length) {
          let e = { value: "0%" };
          return void a.to(e, 1, {
            value: "100%",
            onUpdate: function () {
              t.css("clip-path", "inset(0% 0% " + e.value + " 0%)");
            },
            onComplete: function () {
              e = null;
            },
            ease: Circ.easeIn,
          });
        }
        o = o.first();
        let l = {
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transform: "none",
        };
        if (i.length) {
          (s = s.first()),
            s.find(".dsn-chars-wrapper").length || dsnGrid.convertTextLine(s),
            r.find(".dsn-chars-wrapper").length || dsnGrid.convertTextLine(r),
            (l = s.offset()),
            void 0 === l && (l = { top: 0, left: 0 }),
            a.set(
              i.find(".dsn-chars-wrapper"),
              { x: i.offset().left - l.left, y: i.offset().top - l.top },
              "-=1"
            );
          let e = i.find(".dsn-chars-wrapper").toArray();
          i.offset().left < l.left && e.reverse(),
            a.set(i, { top: l.top, left: l.left }, "-=0.8"),
            a.to(i, 0.4, { padding: "0", borderWidth: 0, yoyo: !0 }),
            a.to(i, 0.8, { css: s.dsnGridStyleObject(), yoyo: !0 }, "-=0.8"),
            i.css("width", s.outerWidth()),
            a.set(e, { color: i.css("color") });
          let t = s.css("color");
          r.length && (t = "var(--heading-color)"),
            a.staggerTo(
              e,
              0.8,
              {
                y: "0",
                x: "0",
                ease: Back.easeOut.config(1),
                color: t,
                yoyo: !0,
              },
              0.02,
              "-=0.35"
            );
        }
        o.length &&
          (l = {
            top: o.get(0).offsetTop,
            left: o.get(0).offsetLeft,
            width: o.width(),
            height: o.height(),
          }),
          n.length &&
            a.to(
              n,
              {
                duration: 1,
                top: l.top,
                left: l.left,
                width: l.width,
                height: l.height,
                objectFit: "cover",
                borderRadius: 0,
                ease: Expo.easeIn,
              },
              "-=1.4"
            );
        let d = { value: "0%" };
        a.to(d, 0.5, {
          value: "100%",
          onUpdate: function () {
            t.css("clip-path", "inset(0% 0% " + d.value + " 0%)");
          },
          onComplete: function () {
            d = null;
          },
          ease: Circ.easeIn,
        });
      },
      animateAjaxEnd: function (n) {
        a.call(
          function () {
            dsnGrid.initAjax(n),
              this.mainRoot.html(e(n).filter("main.main-root").html()),
              t(!0).catch((e) => {
                console.error(e);
              });
          }.bind(this),
          null,
          "+=1"
        );
        let i = e(".dsn-ajax-loader");
        i.hasClass("dsn-ajax-normal")
          ? a.to(i, 1, { autoAlpha: 0, ease: Expo.easeIn })
          : a.call(this.completeElement.bind(this, i)),
          a.eventCallback(
            "onComplete",
            function () {
              i.remove(), this.effectAjax(!1);
            }.bind(this)
          );
      },
      backAnimate: function (t) {
        if (!t) return;
        let n = this;
        e.ajax({
          url: t,
          dataType: "html",
          beforeSend: n.animateAjaxStart.bind(n),
          success: function (e) {
            a.call(n.animateAjaxEnd.bind(n, e), null, null, "+=0.2");
          },
          error: function (e) {
            window.location = t;
          },
        });
      },
    };
  }
  function i() {
    $wind.on("popstate", function (e) {
      if (window.location.hash.length)
        return (
          $wind.scrollTop(0),
          void dsnGrid.scrollTop(window.location.hash, 1, -100)
        );
      document.location.href.indexOf("#") > -1 ||
        setTimeout(function () {
          n().backAnimate(document.location);
        }, 100);
    });
  }
  function a(t) {
    setTimeout(function () {
      e("[data-dsn-" + t + "]").each(function () {
        e(this).attr(t, dsnGrid.getData(this, t, ""));
      });
    }, 100);
  }
  function o() {
    e(".dsn-isotope").each((t, n) => {
      setTimeout(function () {
        let t = e.extend(
          !0,
          { itemSelector: dsnGrid.getData(n, "item", ".grid-item") },
          dsnGrid.getData(n, "isotope", {})
        );
        t.space &&
          dsnGrid
            .convertToJQuery(n)
            .attr("style", "--gutter:" + t.space + "px;"),
          e(n).masonry(t);
      }, 500);
    })
    //,
      // e(".dsn-filter").each(function () {
      //   const t = e(this).find(".filtering-t .filtering "),
      //     n = e(this).find(".dsn-isotope");
      //   t.length &&
      //     n.length &&
      //     (n.isotope(),
      //     t.find("button").off("click"),
      //     t.find("button").on("click", function () {
      //       e(this).addClass("active").siblings().removeClass("active"),
      //         n.isotope({ filter: e(this).attr("data-filter") });
      //     }));
      // }
      // );
  }
  async function s(t) {
    const n = e(".cursor");
    if (!dsnGrid.isMobile() && $body.hasClass("dsn-cursor-effect")) {
      if (!0 === t) return n.attr("class", "cursor"), void i();
      dsnGrid.mouseMove(n, { speed: 0.5 }), i();
    } else
      n.length &&
        (n.css("display", "none"), $body.removeClass("dsn-cursor-effect"));
    function i() {
      dsnGrid.elementHover(
        n,
        "a:not(> img):not(.vid) , .dsn-button-sidebar,  button , .mfp-container",
        "cursor-scale-full"
      ),
        dsnGrid.elementHover(n, ".c-hidden , .social-side a", "no-scale"),
        dsnGrid.elementHover(
          n,
          ".has-popup a , .work-item-box a:not(.effect-ajax)",
          "cursor-scale-half cursor-open"
        ),
        dsnGrid.elementHover(
          n,
          '[data-cursor="close"]',
          "cursor-scale-full cursor-close"
        ),
        dsnGrid.elementHover(n, "a.link-pop ", "cursor-scale-full cursor-view");
    }
  }
  !(function () {
    let n = e(".preloader"),
      a = n.find(".percent"),
      o = { value: 0 },
      s = n.find(".preloader-bar"),
      r = s.find(".preloader-progress");
    const l = document.querySelector(".loading-circle");
    let d = dsnGrid.pageLoad(0, 100, 1e3, function (e) {
      a.text(e), (o.value = e), r.css("width", e + "%"), c(e);
    });
    n.length ||
      (i(),
      t().catch((e) => {
        console.log(e);
      }));
    function c(e) {
      l &&
        (l.style.background =
          "conic-gradient(from 0deg at 50% 50%, rgba(111, 123, 247, 1) 0%, rgba(155, 248, 244, 1) " +
          e +
          "%, #212121 " +
          e +
          "%)");
    }
    $wind.on("load", function () {
      clearInterval(d),
        gsap
          .timeline()
          .to(o, 1, {
            value: 100,
            onUpdate: function () {
              a.text(o.value.toFixed(0)),
                r.css("width", o.value + "%"),
                c(o.value);
            },
          })
          .to(n.find("> *"), { y: -20, autoAlpha: 0 })
          .call(function () {
            n.length &&
              (i(),
              t().catch((e) => {
                console.log(e);
              }));
          })
          .set(o, { value: 0 })
          .to(
            o,
            0.8,
            {
              value: 100,
              onUpdate: function () {
                n.css("clip-path", "inset(" + o.value + "% 0% 0% 0%)");
              },
              ease: Power2.easeInOut,
            },
            "+=0.5"
          )
          .call(function () {
            n.remove(), (d = n = a = o = s = r = null);
          }),
        e(".twentytwenty").twentytwenty();
    });
  })(),
    s();
})(jQuery);

// carousel for devices larger than 992
$(document).ready(function(){
  // Create and mount the thumbnails slider.
  var secondarySlider = new Splide( '#secondary-slider', {
    cover: true,
    arrows: false,
    autoplay: true,
    interval:1500,
    drag: true,
    pagination: false,
    focus: 'center',
    type: "loop",
    perPage:3,
    pauseOnHover:false,
    trimSpace: true,
  } ).mount();
});

// carousel appearing on mobile only
$(document).ready(function(){
  // Create and mount the thumbnails slider.
  var secondarySlider = new Splide( '#carousel-mobile', {
    cover: true,
    arrows: false,
    autoplay: true,
    interval:1500,
    drag: true,
    pagination: false,
    focus: 'center',
    type: "loop",
    pauseOnHover:false,
    trimSpace: true,
  } ).mount();

});
// function to get copyright year
$(document).ready(function(){
  var year_var=new Date().getFullYear();
   document.getElementById('year_var').innerText =year_var;
}).mount();