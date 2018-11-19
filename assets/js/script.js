"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (a, b) {
  "function" == typeof define && define.amd ? define([], function () {
    return a.svg4everybody = b();
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = b() : a.svg4everybody = b();
}(undefined, function () {
  function a(a, b, c) {
    if (c) {
      var d = document.createDocumentFragment(),
          e = !b.hasAttribute("viewBox") && c.getAttribute("viewBox");e && b.setAttribute("viewBox", e);for (var f = c.cloneNode(!0); f.childNodes.length;) {
        d.appendChild(f.firstChild);
      }a.appendChild(d);
    }
  }function b(b) {
    b.onreadystatechange = function () {
      if (4 === b.readyState) {
        var c = b._cachedDocument;c || (c = b._cachedDocument = document.implementation.createHTMLDocument(""), c.body.innerHTML = b.responseText, b._cachedTarget = {}), b._embeds.splice(0).map(function (d) {
          var e = b._cachedTarget[d.id];e || (e = b._cachedTarget[d.id] = c.getElementById(d.id)), a(d.parent, d.svg, e);
        });
      }
    }, b.onreadystatechange();
  }function c(c) {
    function e() {
      for (var c = 0; c < o.length;) {
        var h = o[c],
            i = h.parentNode,
            j = d(i),
            k = h.getAttribute("xlink:href") || h.getAttribute("href");if (!k && g.attributeName && (k = h.getAttribute(g.attributeName)), j && k) {
          if (f) if (!g.validate || g.validate(k, j, h)) {
            i.removeChild(h);var l = k.split("#"),
                q = l.shift(),
                r = l.join("#");if (q.length) {
              var s = m[q];s || (s = m[q] = new XMLHttpRequest(), s.open("GET", q), s.send(), s._embeds = []), s._embeds.push({ parent: i, svg: j, id: r }), b(s);
            } else a(i, j, document.getElementById(r));
          } else ++c, ++p;
        } else ++c;
      }(!o.length || o.length - p > 0) && n(e, 67);
    }var f,
        g = Object(c),
        h = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
        i = /\bAppleWebKit\/(\d+)\b/,
        j = /\bEdge\/12\.(\d+)\b/,
        k = /\bEdge\/.(\d+)\b/,
        l = window.top !== window.self;f = "polyfill" in g ? g.polyfill : h.test(navigator.userAgent) || (navigator.userAgent.match(j) || [])[1] < 10547 || (navigator.userAgent.match(i) || [])[1] < 537 || k.test(navigator.userAgent) && l;var m = {},
        n = window.requestAnimationFrame || setTimeout,
        o = document.getElementsByTagName("use"),
        p = 0;f && e();
  }function d(a) {
    for (var b = a; "svg" !== b.nodeName.toLowerCase() && (b = b.parentNode);) {}return b;
  }return c;
});
'use strict';

(function ($) {
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
})(jQuery);
'use strict';

(function ($) {
    ScrollReveal().reveal('.site-content section:not(.parallax) > *');
    ScrollReveal().reveal('footer > *', {
        delay: 0
    });
})(jQuery);
'use strict';

(function ($) {
    // Smooth Scrolling
    $('.site-header a[href*=\\#]:not([href=\\#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 55
                }, 1500);
                return false;
            }
        }
    });
})(jQuery);
'use strict';

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function value(searchElement, fromIndex) {

            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
            }

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                // c. Increase k by 1. 
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}

var formFieldIndex = {};

function addThePot() {
    var forms = document.querySelectorAll('form');

    if (!forms.length) {
        return;
    }

    var potFieldNames = ["url", "website", "your_website", "my_website", "first_name", "last_name", "email", "e-mail", "mail", "name", "sir_name", "phone", "your-name", "your-email", "subject", "your-subject", "message", "your-message", "ihr_name", "ihre_email_adresse", "ihr_betreff", "ihre_nachricht"];

    var fallbackName = 'contact_me_on_a_full_moon_only';

    forms.forEach(function (form) {
        // Get the existing form field names
        var formFields = getFormFieldNames(form);

        // Append honeypot field
        // Create element
        var hField = document.createElement('input');

        // Type
        hField.setAttribute('type', 'text');

        // Name
        // Use a name that would usually be used for a form, but none of those already available as actual form fields.
        // Use a fallback if all field names are taken.
        var potName = getPotFieldName(formFields, potFieldNames) || fallbackName;
        hField.setAttribute('name', potName);

        formFieldIndex[form] = potName;

        // Disable Autocomplete
        // Use an invalid value to prevent browsers to match against it.
        // (https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#Disabling_autocompletion)
        hField.setAttribute('autocomplete', 'nope');

        // Set tab index to -1 to prevent keyboard users to tab to the hidden field
        hField.setAttribute('tabindex', '-1');

        // Create a label - make the honeypot field as realistic as possible
        var hLabel = document.createElement('label');
        hLabel.htmlFor = hField.name;
        hLabel.innerText = normalizeLabelText(hField.name) + ':';

        // Hide the field and its label from the user
        hLabel.style.display = 'none';
        hField.style.display = 'none';

        // Add the honeypot field at a random location in the form
        var insertIndex = randomIndex(form.children, true);

        // Prevent the honeypot field from being added after the submit button
        if (insertIndex == form.childNodes.length - 1) {
            insertIndex--;
        }
        form.insertBefore(hField, form.children[insertIndex]);
        form.insertBefore(hLabel, form.children[insertIndex]);

        if (form.addEventListener) {
            form.addEventListener('submit', checkThePot, true); // modern browsers
        } else if (form.attachEvent) {
            form.attachEvent('onsubmit', checkThePot); // old IE (eww)
        }
    });
}

function randomIndex(arr, even) {
    var newIndex = 0;

    if (arr.length) {
        newIndex = Math.floor(Math.random() * arr.length);
    }

    if (even && newIndex % 2 != 0) {
        newIndex = (newIndex + 1) % arr.length;
    }

    return newIndex;
}

function normalizeLabelText(rawText) {
    return capitalize(rawText.replace(/[_-]/g, ' '));
}

function capitalize(text) {
    var words = text.toLowerCase().split(' ');
    for (var i = 0; i < words.length; i++) {
        if (words[i].charAt(0) == '(') {
            words[i] = '(' + words[i].charAt(1).toUpperCase() + words[i].substring(2);
        } else {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
        }
    }
    return words.join(' ');
}

function getFormFieldNames(form) {
    var names = [];
    form.childNodes.forEach(function (child) {
        if (child.nodeName && child.nodeName.toLowerCase() == 'label') {
            names.push(child.htmlFor);
        }
    });
    return names;
}

function getPotFieldName(listOfFieldNames, listOfPotNames) {
    var checkNames = listOfPotNames;
    var found = false;
    var hpFieldName;

    do {
        var i = randomIndex(checkNames, false);
        var name = checkNames.splice(i, 1)[0];

        if (!listOfFieldNames.includes(name)) {
            found = true;
            hpFieldName = name;
        }
    } while (!found && checkNames.length);

    return hpFieldName;
}

function checkThePot(evt) {
    var fieldToCheck = document.querySelector('[name="' + formFieldIndex[this] + '"]');

    if (fieldToCheck.value == '') {
        return true;
    } else {
        evt.preventDefault();
        alert("It's a trap!");
        return false;
    }
}

// Main Execution
if (window.addEventListener) {
    window.addEventListener('load', addThePot);
} else if (window.attachEvent) {
    window.attachEvent('onload', addThePot);
}
//# sourceMappingURL=script.js.map