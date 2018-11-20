'use strict';

(function ($) {
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
})(jQuery);
'use strict';

(function () {
    function initMap(id, lattitude, longitude, popupText) {
        // check if id exists
        if (!document.getElementById(id)) {
            return;
        }

        // set up the map
        var map = new L.Map(id);

        // create the tile layer with correct attribution
        var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
        var osm = new L.TileLayer(osmUrl, {
            maxZoom: 18,
            minZoom: 10,
            attribution: osmAttrib
        });

        // start the map
        map.setView(new L.LatLng(lattitude, longitude), 16);
        map.addLayer(osm);

        // add the marker with the appropriate text
        var marker = L.marker([lattitude, longitude]).addTo(map);
        marker.bindPopup(popupText).openPopup();
    }

    initMap('map', 52.51814, 10.0130413, 'Ramlinger Str. 43A');
})();
'use strict';

var _paq = _paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function () {
    var u = "//sieke-net.com/z_analytics/pw/";
    _paq.push(['setTrackerUrl', u + 'piwik.php']);
    _paq.push(['setSiteId', '28']);
    var d = document,
        g = d.createElement('script'),
        s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.async = true;
    g.defer = true;
    g.src = u + 'piwik.js';
    s.parentNode.insertBefore(g, s);
})();
'use strict';

(function ($) {
    try {
        ScrollReveal().reveal('.site-content section:not(.parallax) > *');
        ScrollReveal().reveal('footer > *', {
            delay: 0
        });
    } catch (error) {}
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