(function () {
    "use strict";

    function initLightbox() {
        var triggers = Array.prototype.slice.call(document.querySelectorAll('a.lightbox-trigger[data-lightbox="image"]'));
        if (!triggers.length) {
            return;
        }

        var entriesByTrigger = new Map();

        triggers.forEach(function (trigger) {
            var figure = trigger.closest('[data-lightbox-figure]');
            var img = trigger.querySelector('img');
            if (!(img instanceof HTMLImageElement)) {
                return;
            }

            var caption = "";
            if (figure) {
                var figcaption = figure.querySelector('figcaption');
                if (figcaption) {
                    caption = figcaption.innerHTML.trim();
                }
            }

            var entry = {
                trigger: trigger,
                src: trigger.getAttribute('href'),
                alt: img.getAttribute('alt') || "",
                title: img.getAttribute('title') || "",
                caption: caption
            };

            entriesByTrigger.set(trigger, entry);
        });

        if (!entriesByTrigger.size) {
            return;
        }

        var overlay = createOverlay();
        document.body.appendChild(overlay.root);

        var activeEntry = null;
        var previousFocus = null;

        function openFromTrigger(trigger) {
            var entry = entriesByTrigger.get(trigger);
            if (!entry) {
                return;
            }
            open(entry);
        }

        function open(entry) {
            activeEntry = entry;
            previousFocus = document.activeElement;

            showEntry(entry);

            overlay.root.hidden = false;
            window.requestAnimationFrame(function () {
                overlay.root.classList.add('is-visible');
                overlay.container.focus({ preventScroll: true });
            });
            document.body.classList.add('is-lightbox-open');
            document.addEventListener('keydown', handleKeydown);
        }

        function close() {
            if (!overlay.root.classList.contains('is-visible')) {
                return;
            }
            overlay.root.classList.remove('is-visible');
            document.body.classList.remove('is-lightbox-open');
            document.removeEventListener('keydown', handleKeydown);

            var restoreFocus = previousFocus;
            activeEntry = null;

            window.setTimeout(function () {
                overlay.root.hidden = true;
                overlay.image.removeAttribute('src');
                overlay.image.removeAttribute('srcset');
                if (restoreFocus && typeof restoreFocus.focus === 'function') {
                    restoreFocus.focus({ preventScroll: true });
                }
            }, 200);
        }

        function showEntry(entry) {
            overlay.image.src = entry.src;
            overlay.image.alt = entry.alt;
            if (entry.title) {
                overlay.image.title = entry.title;
            } else {
                overlay.image.removeAttribute('title');
            }

            if (entry.caption) {
                overlay.caption.innerHTML = entry.caption;
                overlay.caption.hidden = false;
            } else {
                overlay.caption.textContent = "";
                overlay.caption.hidden = true;
            }
        }

        function handleKeydown(event) {
            if (!overlay.root.classList.contains('is-visible')) {
                return;
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                close();
                return;
            }
        }

        overlay.root.addEventListener('click', function (event) {
            if (event.target === overlay.root || !overlay.image.contains(event.target)) {
                close();
            }
        });

        triggers.forEach(function (trigger) {
            trigger.addEventListener('click', function (event) {
                event.preventDefault();
                openFromTrigger(trigger);
            });
        });
    }

    function createOverlay() {
        var root = document.createElement('div');
        root.className = 'lightbox-overlay';
        root.setAttribute('data-lightbox-overlay', '');
        root.hidden = true;

        var container = document.createElement('div');
        container.className = 'lightbox-container';
        container.setAttribute('role', 'dialog');
        container.setAttribute('aria-modal', 'true');
        container.setAttribute('aria-label', 'Image preview');
        container.tabIndex = -1;
        root.appendChild(container);

        var stage = document.createElement('div');
        stage.className = 'lightbox-stage';
        container.appendChild(stage);

        var image = document.createElement('img');
        image.className = 'lightbox-image';
        image.setAttribute('data-lightbox-image', '');
        image.alt = '';
        stage.appendChild(image);

        var caption = document.createElement('p');
        caption.className = 'lightbox-caption';
        caption.setAttribute('data-lightbox-caption', '');
        caption.hidden = true;
        container.appendChild(caption);

        return {
            root: root,
            container: container,
            image: image,
            caption: caption
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        initLightbox();
    }
})();
