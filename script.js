//var apiUrl = 'https://dev.platypusinnovations.com/api';
var apiUrl = 'https://api.terpenejourney.com';

if (getTLD() == 'terpenejourney.com') {
	var apiUrl = 'https://api.terpenejourney.com';
}

var retailerId = "48763c11-5642-48ed-9b17-17852c4fd88f";

var graph = graphql("https://plus.dutchie.com/plus/2021-07/graphql", {
	method: "POST",
	asJSON: true,
	headers: {
		"Authorization": "Bearer public-eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJBUEktQ0xJRU5UIiwiZXhwIjozMzIwNjYyNjg4NSwiaWF0IjoxNjQ5NzE4MDg1LCJpc3MiOiJodHRwczovL2R1dGNoaWUuY29tIiwianRpIjoiNzVkMzcyOGUtYTRkOC00MTliLTg5YzktNmI2MzRkOWVjOWRhIiwiZW50ZXJwcmlzZV9pZCI6IjE3MmY2NWMzLTczZTctNDU5ZC1hZTM1LTA4OTdiMjE2MDI3OCIsInV1aWQiOiI2NzVmYWRlOC03YWU3LTQ2NmEtOTAyYS1iOTQ4NjQ0ZjhmMWYifQ.JcqHRAMTyB_cF6uVQ-4toM3K3njIkX-dMvUUfxznIrY"
	},
	fragments: {
		retailerFragment: `on Retailer {
			address,
			description,
			id,
			menuTypes,
			name
		}`,
		terpeneFragment: `on Terpene {
			aliasList,
			aromas,
			description,
			effects,
			id,
			name,
			potentialHealthBenefits,
			unitSymbol,
		}`,
		activeTerpeneFragment: `on ActiveTerpene {
			id,
			terpene, {
				...terpeneFragment
			}
			name,
			terpeneId,
			unit,
			unitSymbol,
			value,
		}`,
		activeCannabinoidFragment: `on ActiveCannabinoid {
			cannabinoidId,
			cannabinoid, {
				description,
				id,
				name,
			}
			unit,
			value,
		}`,
		productFragment: `on Product {
			brand, {
				description,
				id,
				imageUrl,
				name,
			}
			category,
			description,
			descriptionHtml,
			effects,
			enterpriseProductId,
			id,
			productBatchId,
			image,
			images, {
				id,
				url,
				label,
				description,
			}
			menuTypes,
			name,
			slug,
			posId,
			potencyCbd, {
				formatted,
				range,
				unit,
			}
			potencyThc, {
				formatted,
				range,
				unit,
			}
			posMetaData, {
				id,
				category,
				sku,
			}
			staffPick,
			strainType,
			subcategory,
			tags,
			variants, {
				id,
				option,
				priceMed,
				priceRec,
				specialPriceMed,
				specialPriceRec,
				quantity,
			}
			terpenes, {
				...activeTerpeneFragment
			}
			cannabinoids, {
				...activeCannabinoidFragment
			}
		}`,
		checkoutAdressFragment: `on CheckoutAddress {
			city,
			deliverable,
			formatted,
			geometry, {
				coordinates,
				type,
			}
			state,
			street1,
			street2,
			valid,
			zip,
		}`,

		itemFragment: `on Item {
			id,
			errors,
			option,
			product, {
				...productFragment
			}
			productId,
			quantity,
			valid,
			isDiscounted,
			basePrice,
			discounts, {
				total,
			}
			taxes, {
				total,
				cannabis,
				sales,
			}
		}`,
		priceSummaryFragment: `on PriceSummary {
			discounts,
			fees,
			mixAndMatch,
			rewards,
			subtotal,
			taxes,
			total,
		}`,
		checkoutFragment: `on Checkout {
			address, {
				...checkoutAdressFragment
			}
			createdAt,
			id,
			items, {
				...itemFragment
			}
			orderType,
			priceSummary, {
				...priceSummaryFragment
			}
			pricingType,
			redirectUrl,
			updatedAt,
		}`,
		productFragment: `on Product {
			brand, {
				description,
				id,
				imageUrl,
				name,
			}
			category,
			description,
			descriptionHtml,
			effects,
			enterpriseProductId,
			id,
			productBatchId,
			image,
			images, {
				id,
				url,
				label,
				description,
			}
			menuTypes,
			name,
			slug,
			posId,
			potencyCbd, {
				formatted,
				range,
				unit,
			}
			potencyThc, {
				formatted,
				range,
				unit,
			}
			posMetaData, {
				id,
				category,
				sku,
			}
			staffPick,
			strainType,
			subcategory,
			tags,
			variants, {
				id,
				option,
				priceMed,
				priceRec,
				specialPriceMed,
				specialPriceRec,
				quantity,
			}
			terpenes, {
				...activeTerpeneFragment
			}
			cannabinoids, {
				...activeCannabinoidFragment
			}
		}`,
		customerFragment: `on Customer {
			birthdate,
			email,
			guest,
			id,
			medicalCard {
				expirationDate,
				number,
				photo,
				state,
			},
			name,
			optIns {
				marketing,
				orderStatus,
				specials,
			},
			phone,
		}`,
		orderFragment: `on Order {
			createdAt,
			customer {
				...customerFragment
			},
			customerId,
			delivery,
			dispensaryName,
			foreignId,
			id,
			items {
				option,
				price,
				product {
					...productFragment
				},
				productId,
				quantity,
				subtotal,
			},
			medical,
			metadata,
			orderNumber,
			paymentMethod,
			pickup,
			recreational,
			reservationDate {
				startTime,
				endTime,
			},
			status,
			subtotal,
			tax,
			total,
		}`
	}
});

function fixElements() {
}

var TJ = TJ || {};
"object" == typeof module && module.exports && (module.exports = TJ),
window.console || (console = {
	log: function() {}
}),
function(TJ) {
	// It's helpful to have some of these document values for templating
	doc = {};
	doc.location = {};
	doc.location.searchParams = {};
	doc.cookie = {};
	doc.location = Object.assign(doc.location, JSON.parse(JSON.stringify(document.location)));
	doc.location.searchParams = Object.assign(doc.location.searchParams, Object.fromEntries(new URLSearchParams(document.location.search)));
	doc.cookie = Object.assign(doc.cookie, Object.fromEntries(document.cookie.split('; ').map(v=>v.split(/=(.*)/s).map(decodeURIComponent))));

	TJ.document = doc
}(TJ),
function(TJ) {
	var util = {};

	// Add the notification bar
	// TODO: a new norification bar needs to be added for every new notification that fires. Otherwise, if the customer
	// manually closes the notification and triggers a new error all under 5s, the bar will get closed by the first
	// `setTimeout()` iteration.
	// https://webdesignerhut.com/pure-css-notification-bars/
	var notificationBar = (`
	<!--label for="toggle-notification" id="show-notification">+</label-->
	<input type="checkbox" id="toggle-notification" name="toggle-notification" value="toggle-notification">
	<div id="notification-bar">
		<div id="notification-message"></div>
		<label for="toggle-notification" id="hide-notification">&#10005;</label>
	</div>
	`);

	$('body').prepend(notificationBar);

	/**
	 * The message severity uses the standard syslog levels:
	 * 0	Emergency: system is unusable
	 * 1	Alert: action must be taken immediately
	 * 2	Critical: critical conditions
	 * 3	Error: error conditions
	 * 4	Warning: warning conditions
	 * 5	Notice: normal but significant condition
	 * 6	Informational: informational messages
	 * 7	Debug: debug-level messages
	 *
	 * @param {string} message
	 * @param {number} severity
	 */
	util.notify = function(message, severity = 3) {
		var background = "";
		var fontColor = "#FFFFFF";

		switch (severity) {
			case 0:
			case 1:
			case 2:
			case 3:
				// Vibrant Red
				background = '#E03C39';
				break;
			case 4:
				// Solar Orange
				background = '#FF9E25';
				break;
			case 5:
				// Electric Yellow
				background = '#FBE232';
				break;
			case 6:
				// Electric Green
				background = '#AAAD29';
				break;
			case 7:
				// Stripes using white and Faded Gray
				background = `repeating-linear-gradient(
					45deg,
					#D0D1DB 0px,
					#D0D1DB 20px,
					#FFFFFF 20px,
					#FFFFFF 40px
				)`;
				fontColor = '#4B5058';
				break;
		}

		$('#notification-message').html(message);
		$('#notification-message').css('color', fontColor);
		$('#notification-bar').css('background', background);
		$('#notification-bar').addClass('show');

		setTimeout(function() {
			$('#notification-bar').removeClass('show');

			setTimeout(function() {
				$('#notification-message').html("");
			}, 500);
		}, 5000);
	}

	util.setCookie = function(cname, cvalue, exdays) {
		const date = new Date();
		date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
		let expires = "expires=" + date.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	util.getCookie = function(cname) {
		let name = cname + "=";
		let ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	util.uuidv4 = function() {
		return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
			(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
		);
	}

	util.cors = function() {
		fetch("https://api.terpenejourney.com/cors", {
			"method": "GET",
			"credentials": 'include',
			"headers": {
				"content-type": "application/json"
			}
		}).then(function(response) {
		}).catch(error => {
			console.error(error);
		});
	};

	util.parseDutchieError = function(error) {
		if (
			typeof(error[0]) !== 'undefined' &&
			typeof(error[0].extensions) !== 'undefined' &&
			typeof(error[0].extensions.errors) !== 'undefined' &&
			typeof(error[0].extensions.errors[0]) !== 'undefined'
		) {
			return error[0].extensions.errors[0].detail;
		}
		else if (
			typeof(error[0]) !== 'undefined' &&
			typeof(error[0].message) !== 'undefined'
		) {
			return error[0].message;
		}
		else if (
			error.networkError !== null &&
			typeof(error.networkError) !== 'undefined' &&
			typeof(error.networkError.statusCode) !== 'undefined'
		) {
			return error.networkError.message;
		}
		else {
			return "An unknown error has occurred";
		}
	}

	util.formatPhoneNumber = function(number) {
		if (!number)
			return number;
		const phoneNumber = number.replace(/[^\d]/g, '');
		const phoneNumberLength = phoneNumber.length;
		if (phoneNumberLength == 1 && phoneNumber == '1')
			return "";
		if (phoneNumberLength < 4)
			return phoneNumber;
		if (phoneNumberLength < 7) {
			return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
		}
		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`.slice(0, 14);
	}

	util.formatDate = function(event) {
		var value = event.target.value;
		if (!value)
			return value;
		if (event.keyCode != 8) {
			const dateVal = value.replace(/[^\d]/g, '');
			const dateValLength = dateVal.length;
			if (dateValLength < 2)
				return dateVal;
			if (dateValLength < 4) {
				return `${dateVal.slice(0, 2)}/${dateVal.slice(2)}`;
			}
			return `${dateVal.slice(0, 2)}/${dateVal.slice(2, 4)}/${dateVal.slice(4)}`.slice(0, 10);
		}
		return value;
	}

	util.renderTemplate = function(show = false) {
		function decode(str) {
			let txt = document.createElement("textarea");
			txt.innerHTML = str;
			return txt.value;
		}

		//nunjucks.configure(/*{ throwOnUndefined: true }*/);
		const nj = new nunjucks.Environment();

		nj.addFilter('toFixed', function(num, digits) {
			return parseFloat(num).toFixed(digits)
		});

		function preprocessTemplate() {
/*			// Search through the body to find any variables that exist to fetch necessary data (cuts down on unnecessary API calls)
			var elements = [];

			$('body')[0].outerHTML.split("{").forEach(function(el, key, arr) {
				el = el.trim();
				// This is a logic block
				if (el.substr(0,1) == '%') {
					var block = el.split('%');
					if (block.length > 2) {
						var logic = block[1].trim().split(' in ');
						if (logic.length > 1) {
							elements.push(logic[1].split('.')[0]);
						}
					}
				}

				// This means:
				// 1) not the first element (can't be because the previous element must be empty due point 2)
				// 1) previous element was empty (left over from splitting two curly braces)
				// 2) current element contains two closing braces
				else if (key != 0 && arr[key - 1].trim() == "" && el.split("}}").length == 2) {
					elements.push(el.split('.')[0]);
				}
			});

			elements = [...new Set(elements)];

			elements.forEach(function(el, key) {
				if (TJ[el] !== undefined) {
					for (prop in TJ[el]) {
						if (typeof(TJ[el][prop]) != 'function') {
							delete(elements[key])
							continue;
						}
					}

				}
			});

			elements = elements.filter(function(value, index, arr){
				return value !== undefined;
			});

			//  TODO: do something with the responses?
			elements.forEach(function(el) {
				if (TJ[el] !== undefined) {
					TJ[el].get().then(function(response) {
						response;
					}).catch(function(error) {
						error;
					});
				}
			})
*/
		}

		/**
		 * When re-rendering, this removes all existing elements and replaces
		 * them with the hidden backup template elements
		 */
		if ($('[data-jinja-template]').length == 1) {
			const jinjaArr = JSON.parse($('[data-jinja-template]').contents()[0].data);

			jinjaArr.forEach(function(el) {
				const uuid = $(el).attr('data-jinja-uuid');
				const data_jinja = $(el).attr('data-jinja');
				
				if (data_jinja.match(/^ *{% *for/)) {
					$(`[data-jinja-uuid=${uuid}]`).replaceWith($(el));
				}
				else {
					$(`[data-jinja-uuid=${uuid}]`).attr('data-jinja', $(el).attr('data-jinja'));
				}
			});
		}

		/**
		 * This captures all current template elements in order to save as
		 * a comment at the bottom of the page in div[data-jinja-template]
		 */
		else {
			let jinjaArr = [];
			$('[data-jinja]').each(function(key, el) {
				//if ($(this).parents('[data-jinja]').length == 0) {
					$(this).attr('data-jinja-uuid', TJ.util.uuidv4());

					jinjaArr.push($(this).prop('outerHTML'));
				//}
			});

			$('body').append('<div class="hidden" data-jinja-template><!--' + JSON.stringify(jinjaArr) + '--></div>');
		}

		// Process reserved Webflow attributes (src, href, action, etc)
		$("[data-jinja]:not([data-jinja^='{'], [data-jinja=''])").each(function() {
				const el = $(this).attr('data-jinja');
				if (el.match(/^[^{}%]+=/)) {
					var attribute = el.trim().split('=');
					var attrName = attrValue = "";
					var process = true;

					if (attribute.length >= 2) {
						if (attribute[0] == 'text') {
							attrName = 'text';
							attrValue = el.substring(5);
						}
						else {
							attrName = attribute[0];
							attrValue = el.substring(`${attrName}=`.length);
						}

						attrName == 'text' ? $(this).text(attrValue) : $(this).attr(attrName, attrValue);

						// Determine if the element is in a for loop or not
						if ($(this).parents("[data-jinja^='{%for'], [data-jinja^='{% for']").length > 0) {
							process = false;
						}
						else {
							$(this).parents("[data-jinja]:not([data-jinja^='{%for'], [data-jinja^='{% for'], [data-jinja=''])").each(function(key, parent) {
								if (
									$(parent).attr('data-jinja').startsWith('{') &&
									$(parent).attr('data-jinja').match(/.*{% *for/) > 0
								) {
									process = false;
								}
							})
						}

						if (process) {
							try {
								attrName == 'text' ? $(this).text(nj.renderString(attrValue, TJ)) : $(this).attr(attrName, nj.renderString(attrValue, TJ));
							} catch (error) {
								console.error(error);
							}
							$(this).removeAttr('data-jinja');
						}
						else {
							$(this).attr('data-jinja', "");
						}
					}
				}
		});

		preprocessTemplate();
		$('body').find('[data-jinja]').each(function() {
			let tag = $(this).attr('data-jinja');
			let endTag = tag.replace(/^ *{% *([a-z]+).*/, "{% end$1 %}")
			$(this).prepend(tag);
			$(this).append(endTag);
			$(this).attr('data-jinja', "");
		});

		$('[data-jinja]').each(function(key, el) {
			if ($(this).parents('[data-jinja]').length == 0) {
				var source = decode($(this)[0].outerHTML)

				try {
					var rendered = nj.renderString(source, TJ);
				} catch (error) {
					console.error(error);
				}

				try {
					$(this).replaceWith($(rendered));
				}
				catch (error) {
					console.error(error);
				}

				// These removeAttr functions aren't working for some reason
				$(this).first().find('[data-jinja]').each(function() {
					$(this).removeAttr('data-jinja');
				});

				$(this).removeAttr('data-jinja')
			}
		})

		// This is the only way to remove the data-jinja attrs
		$('[data-jinja').removeAttr('data-jinja');

		renderSidecart(show);
	}

	renderSidecart = function(show = false) {
		if (show) {
			$('.headlessshoppingcart-pay-cart').addClass('showheadlessshoppingcart-pay-cart');
			$('html, body').addClass("noscroll");
		}
	}

	util.apiUrl = apiUrl;
	TJ.util = util;
}(TJ),
function(TJ) {
	var retailer = { id: `${retailerId}` };
	retailer.get = function() {
		return graph(`query {
			retailer(
			id: "${retailer.id}"
			) {
				...retailerFragment
			}
		}`)().then(function(response) {
			retailer = Object.assign(retailer, response.retailer);
			return response;
		}).catch(error => {
			console.error(error);
		});
	};

	TJ.retailer = retailer;
}(TJ),
function(TJ) {
	var checkout = { id: TJ.util.getCookie("dutchie_checkout_id") };
	// This is stupidly redundant. It should be possible to do `checkout.get = checkout.checkoutQuery({checkoutId: checkoutId})
	checkout.get = function() {
		if (checkout.id == "") {
			TJ.checkout.createCheckout({orderType: "PICKUP", pricingType: "RECREATIONAL"}).then(function (response) {
				return response;
			}).catch(error => {
				console.error(error);
			});
		}
		else {
			return graph(`query (
				$checkoutId: ID!
			) {
				checkout(
				retailerId: "${TJ.retailer.id}"
				id: $checkoutId
				) {
					...checkoutFragment
				}
			}`)({checkoutId: checkout.id}).then(function(response) {
				response.checkout = formattedSlug(response.checkout);
				checkout = Object.assign(checkout, response.checkout);
				checkout = Object.assign(checkout, { formData: JSON.parse(window.localStorage.getItem('dutchie_checkout_formdata'))});
				return response;
			}).catch(function(error) {
				if (
					typeof(error[0]) !== 'undefined' &&
					typeof(error[0].message) !== 'undefined' &&
					error[0].message.toLowerCase() == 'not found'
				) {
					TJ.checkout.createCheckout({orderType: "PICKUP", pricingType: "RECREATIONAL"}).then(function (response) {
						return response;
					});
				}
				else {
					TJ.util.notify(TJ.util.parseDutchieError(error));
					console.error(error);
				}
			});
		}
	};
	checkout.checkoutQuery = function(vars) {
		return graph(`query (
			$checkoutId: ID!
		) {
			checkout(
			retailerId: "${TJ.retailer.id}"
			id: $checkoutId
			) {
				...checkoutFragment
			}
		}`)(vars).then(function(response) {
			response.checkout = formattedSlug(response.checkout);
			checkout = Object.assign(checkout, response.checkout);
			checkout = Object.assign(checkout, { formData: JSON.parse(window.localStorage.getItem('dutchie_checkout_formdata'))});
			return response;
		}).catch(error => {
			TJ.util.notify(TJ.util.parseDutchieError(error));
			console.error(error);
		});
	};
	checkout.createCheckout = function(vars) {
		return graph(`mutation (
			$address: CheckoutAddressInput
			$orderType: OrderType!
			$pricingType: PricingType!
			$metadata: JSON
			) {
			createCheckout(
				retailerId: "${TJ.retailer.id}"
				address: $address
				orderType: $orderType
				pricingType: $pricingType
				metadata: $metadata
			) {
				...checkoutFragment
			}
		}`)(vars).then(function(response) {
			response.createCheckout = formattedSlug(response.createCheckout);
			checkout = Object.assign(checkout, response.createCheckout);
			TJ.util.setCookie("dutchie_checkout_id", checkout.id, 14);
			return response;
		}).catch(error => {
			TJ.util.notify(TJ.util.parseDutchieError(error));
			console.error(error);
		});
	};
	checkout.addItem = function(vars) {
		if (
			Object.values(vars).includes(null) ||
			Object.values(vars).includes(undefined)
		) {
			return new Promise((resolve,reject) => {
				// do some async task
				resolve(0);
			 });		 
		}

		return graph(`mutation (
			$checkoutId: ID!
			$productId: ID!
			$quantity: Int!
			$option: String!
		) {
			addItem(
				retailerId: "${TJ.retailer.id}"
				checkoutId: $checkoutId
				productId: $productId
				quantity: $quantity
				option: $option
			) {
				...checkoutFragment
			}
		}`)(vars).then(function(response) {
			response.addItem = formattedSlug(response.addItem);
			checkout = Object.assign(checkout, response.addItem);
			return response;
		}).catch(error => {
			TJ.util.notify(TJ.util.parseDutchieError(error));
			console.error(error);
		});
	};
	checkout.removeItem = function(vars) {
		return graph(`mutation (
			$checkoutId: ID!
			$itemId: ID!
		) {
			removeItem(
			retailerId: "${TJ.retailer.id}"
			checkoutId: $checkoutId
			itemId: $itemId
			) {
				...checkoutFragment
			}
		}`)(vars).then(function(response) {
			response.removeItem = formattedSlug(response.removeItem);
			checkout = Object.assign(checkout, response.removeItem);
			return response;
		}).catch(error => {
			TJ.util.notify(TJ.util.parseDutchieError(error));
			console.error(error);
		});
	};
	checkout.updateQuantity = function(vars) {
		return graph (`mutation (
			$checkoutId: ID!
			$itemId: ID!
			$quantity: Int!
		) {
			updateQuantity(
				retailerId: "${TJ.retailer.id}"
				checkoutId: $checkoutId
				itemId: $itemId
				quantity: $quantity
			) {
				...checkoutFragment
			}
		}`)(vars).then(function(response) {
			response.updateQuantity = formattedSlug(response.updateQuantity);
			checkout = Object.assign(checkout, response.updateQuantity);
			return response;
		}).catch(error => {
			TJ.util.notify(TJ.util.parseDutchieError(error));
			console.error(error);
		});
	};
	checkout.updateCheckout = function(vars) {
		return graph (`mutation (
			$checkoutId: ID!,
			$address: CheckoutAddressInput,
			$orderType: OrderType!,
			$pricingType: PricingType,
			$metadata: JSON
		) {
			updateCheckout(
				retailerId: "${TJ.retailer.id}"
				checkoutId: $checkoutId,
				address: $address,
				orderType: $orderType,
				pricingType: $pricingType,
				metadata: $metadata
			) {
				id
			}
		}`)(vars).then(function(response) {
			return response;
		}).catch(error => {
			TJ.util.notify(TJ.util.parseDutchieError(error));
			console.error(error);
		});
	};
	checkout.initSidecart = function(show = false) {
		if (document.location.pathname == "/checkout") {
			return;
		}

		TJ.util.renderTemplate(show);
	};

	formattedSlug = function(checkout) {
		checkout.items.forEach((item, key) => {
			var slug = item.product.brand.name + "-" + item.product.slug + "-" + item.product.category;
			slug = slug.toLowerCase()
				.replace("á", "a")
				.replace("à", "a")
				.replace("â", "a")
				.replace("å", "a")
				.replace("æ", "ae")
				.replace("ç", "c")
				.replace("è", "e")
				.replace("é", "e")
				.replace("ë", "e")
				.replace("ê", "e")
				.replace("î", "i")
				.replace("ï", "i")
				.replace("ì", "i")
				.replace("ñ", "n")
				.replace("ô", "o")
				.replace("ö", "o")
				.replace("ò", "o")
				.replace("ø", "o")
				.replace("õ", "o")
				.replace("ù", "u")
				.replace("û", "u")
				.replace("ü", "u")
				.replace("ý", "y")
				.replace(" ", "-")
				.replace("!", "-")
				.replace(".", "-")
				.replace("/", "-")
				.replace("\"", "-")
				.replace("#", "-")
				.replace("$", "-")
				.replace("%", "-")
				.replace("&", "-")
				.replace("'", "")
				.replace("(", "")
				.replace(")", "")
				.replace("*", "-")
				.replace("+", "-")
				.replace(",", "-")
				.replace(":", "-")
				.replace(";", "-")
				.replace("<", "-")
				.replace("=", "-")
				.replace(">", "-")
				.replace("?", "-")
				.replace("@", "-")
				.replace("[", "")
				.replace("\\", "-")
				.replace("]", "")
				.replace("^", "-")
				.replace("_", "-")
				.replace("`", "-")
				.replace("{", "")
				.replace("|", "-")
				.replace("}", "")
				.replace("~", "")
				.replace("«", "")
				.replace("»", "")
				.replace("€", "")
				.replace("„", "")
				.replace("“", "")
				.replace("-----", "-")
				.replace("-----", "-")
				.replace("----", "-")
				.replace("---", "-")
				.replace("’", "")
				.replace('”', "-")
				.replace("•", "-")
				.replace("--", "-")
				.trim();

			checkout.items[key].slug = slug;
		});

		return checkout;
	}

	TJ.checkout = checkout;
}(TJ),
//function(TJ) {
//	var customer = {};
//	TJ.customer = customer;
//}(TJ),
//function(TJ) {
//	var product = {};
//	TJ.product = product;
//}(TJ),
function(TJ) {
	var user = {};
	user.login = function(emailAddress, pass, redir = null) {
		return fetch(`${apiUrl}/users/login`, {
			"method": "POST",
			"credentials": 'include',
			"headers": {
				"content-type": "application/json"
			},
			"body": JSON.stringify({
				email: emailAddress,
				password: pass
			})
		}).then(res =>
			res.json())
		.then((response) => {
			if (redir) {
				window.location.href = redir
			}
			else {
				user = Object.assign(user, response.data.user);
				TJ.util.renderTemplate();
				return response.data.user;
			}
		}).catch(error => {
			TJ.util.notify(TJ.util.parseDutchieError(error));
			console.error(error);
		});
	}

	user.logout = function(emailAddress, pass, redir = null) {
		return fetch(`${apiUrl}/users/logout`, {
			"method": "POST",
			"credentials": 'include',
			"headers": {
				"content-type": "application/json"
			}
		}).then(res =>
			res.json())
		.then((response) => {
			if (redir) {
				window.location.href = redir
			}
			Object.keys(user).forEach(el => {
				if (typeof(user[el]) !== 'function') {
					delete(user[el]);
				}
			});
			
			user.id = 0;
			window.localStorage.removeItem('dutchie_checkout_formdata');

			if (response.message !== 'undefined') {
				TJ.util.notify(response.message, 6);
			}
			TJ.util.renderTemplate();
		}).catch(error => {
			TJ.util.notify(TJ.util.parseDutchieError(error));
			console.error(error);
		});
	}

	user.get = function() {
		return fetch(`${apiUrl}/users`, {
			"method": "GET",
			"credentials": 'include',
			"headers": {
				"content-type": "application/json"
			}
		}).then(res =>
			res.json())
		.then((response) => {
			user = Object.assign(user, response.data.user);
		}).catch(error => {
			console.error(error);
		});
	}

	TJ.user = user;
}(TJ),
function(TJ) {
	var orders = {};

	// TODO: this method needs to receive ALL orders regardless of pagination
	orders.get = function() {
		return fetch(`${apiUrl}/users/${TJ.user.id}/orders`, {
			"method": "GET",
			"credentials": 'include',
			"headers": {
				"content-type": "application/json"
			}
		}).then(res =>
			res.json())
		.then((response) => {
			orders.transactions = response.data.orders;
		}).catch(error => {
			console.error(error);
		});
	}

	TJ.orders = orders;
}(TJ),
function(TJ) {
	$(document).ready(function () {
		if (window.location.hash == "#custom") {
			fixElements();
		}

		if (TJ.util.getCookie("dutchie_access_token") == "") {
			TJ.util.cors();
		}
	});
}(TJ),
function(TJ) {
//	document.onreadystatechange = function () {
//		if (document.readyState === "complete") {
//			console.log(__LINE__());
//			TJ.util.renderTemplate();
//			loadListeners();
//		}
//	}

	var prodProps = {
		checkoutId: TJ.checkout.id,
		productId: TJ.document.location.searchParams.productid || null,
		option: TJ.document.location.searchParams.option || null,
		quantity: TJ.document.location.searchParams.quantity || 1,
	};

	TJ.checkout.addItem(prodProps)
	.then((something) => {
	}).catch((error) => {
		if (error[0].message) {
			TJ.util.notify(error[0].message);
		}
	}).finally((values) => {
		Promise.all([
			TJ.checkout.get(),
			TJ.retailer.get(),
			TJ.user.get(),
		]).then((values) => {
			console.log(__LINE__());
			TJ.checkout.initSidecart(window.location.hash == '#sidecart');

			$(document).ready(function () {
				console.log(__LINE__());
				TJ.util.renderTemplate();
				loadListeners();
			});
		
		}).catch((error) => {
			if (error[0].message) {
				TJ.util.notify(error[0].message);
			}
			else {
				console.error(error);
			}
		});
	});

}(TJ);
(function(TJ) {
	function defer(method, lib) {
		if (window[lib])
			method();
		else
			setTimeout(function() { defer(method, lib) }, 50);
	}

//	document.onreadystatechange = function () {
//		if (document.readyState === "complete") {
//			TJ.util.renderTemplate();
//		}
//	}
}(TJ));
(function(TJ) {
	var customer = {};
	$i = 1;
}(TJ));

jQuery(function() {
//	if (typeof TJ.onLoad === 'function') {
//		TJ.onLoad();
//	}

//	TJ.client.init();
});

function loadListeners() {
	$('body').on('change', 'form#checkout-form input[name]', function() {
		var formData = {};
		$('form#checkout-form input[name]').each(function() {
			if (this.type != 'password') {
				formData[this.name] = $(this).val();
			}
		});

		window.localStorage.setItem('dutchie_checkout_formdata', JSON.stringify(formData));
		TJ.checkout.formData = formData;
	});

	$('body').on('keydown', 'form#checkout-form input[name=phone]', function() {
		$(this).val(TJ.util.formatPhoneNumber($(this).val()));
	});
	$('body').on('change', 'form#checkout-form input[name=phone]', function() {
		$(this).val(TJ.util.formatPhoneNumber($(this).val()));
	});

	//$('body').on('keyup', 'form#checkout-form input[name=birthday]', function(event) {
	//	$(this).val(TJ.util.formatDate(event));
	//});

	$('body').on('click', '.orderdetail__grid .checkoutsummary__textremovelink', function(event) {
		//const itemId = $('.orderdetail__grid .checkoutsummary__textremovelink').siblings('[data-itemid]').attr('data-itemid');
		const itemId = $(event.target).siblings('[data-itemid]').attr('data-itemid');
		TJ.checkout.removeItem({checkoutId: TJ.checkout.id, itemId: itemId}).then(function (res) {
			TJ.util.renderTemplate()
		}).catch(error => {
			TJ.util.notify(error.map(x => x["message"]).join("<br>"))
		});
	});

	$('body').on('change', '#checkout-form [name=order_type]', function() {
		TJ.checkout.updateCheckout({
			checkoutId: `${TJ.checkout.id}`,
			orderType: 'DELIVERY',
		});
	});

	function submitForm(event) {
		event.preventDefault();
		fetch(event.target.form.action, {
			"method": "POST",
			"credentials": 'include',
			"headers": {
				"content-type": "application/json"
			},
			"body": JSON.stringify(
				Object.fromEntries(
					new FormData(event.target.form)
				)
			)
		}, event).then(async (res) => {
			if (res.status < 200 || res.status > 399) {
				error = await res.json();
				throw new Error(error.message);
			}
			res.json().then((response) => {
				if (typeof(response.data) === 'object') {
					Object.keys(response.data).forEach(function(el) {
						if (typeof(response.data[el]) === 'object' && typeof(TJ[el]) !== 'undefined') {
							TJ[el] = Object.assign(TJ[el], response.data[el])
						}
					});
				}

				TJ.util.renderTemplate();

				if ($(this).attr('redirect')) {
					window.location.href = $(this).attr('redirect');
				}

				var useNotify = true;

				$(event.target.form).parents().each(function() {
					var parent = $(this);
					parent.siblings().each(function() {
						var sibling = $(this);
						if (
							sibling.data('api-message') !== 'undefined' &&
							sibling.data('api-message') == response.message
						) {
							sibling.css('display', 'block');
							parent.css('display', 'none');
							useNotify = false;
						}
					})
				});
	
				if (useNotify) {
					if (typeof(response.message) !== 'undefined') {
						document.querySelectorAll("div.close-overlay").forEach(el => {
							if (el.checkVisibility()) {
								const node = document.querySelector ("div.close-overlay");
								const event = new MouseEvent("click", {
									view: window,
									bubbles: true,
									cancelable: true,
								});
								el.dispatchEvent(event)
							}
						});

						TJ.util.notify(response.message, 6);
					}
					else {
						TJ.util.notify('Success', 6);
					}
				}
			}).catch((error) => {
				TJ.util.notify(error.message);
			}, event);
		}).catch((error) => {
			var useNotify = true;

			$(event.target.form).parents().each(function() {
				var parent = $(this);
				parent.siblings().each(function() {
					var sibling = $(this);
					if (
						sibling.data('api-message') !== 'undefined' &&
						sibling.data('api-message') == error.message
					) {
						sibling.css('display', 'block');
						parent.css('display', 'none');
						useNotify = false;
					}
				})
			});

			if (useNotify) {
				TJ.util.notify(error.message);
			}
		});
	};

	//$('body').on('mousedown', `form[action^="${TJ.util.apiUrl}"] input[type=submit]`, function(event) {submitForm(event)});
	$('body').on('click', `form[action^="${TJ.util.apiUrl}"] input[type=submit]`, function(event) {submitForm(event)});

/*	$('form').each(function() {
		if (
			typeof($(this).attr('action')) !== 'undefined' &&
			$(this).attr('action').startsWith(`${apiUrl}`)
		) {
			$(this)[0].addEventListener("submit", function (event) {
				event.preventDefault();
				   fetch($(this).attr('action'), {
					"method": "POST",
					"credentials": 'include',
					"headers": {
						"content-type": "application/json"
					},
					"body": JSON.stringify(
						Object.fromEntries(
							new FormData(
								$(this)[0]
						)))
				}).then(async (res) => {
					TJ.util.renderTemplate();

					if (res.status < 200 || res.status > 399) {
						error = await res.json();
						throw new Error(error.message);
					}
					res.json().then((response) => {
						if ($(this).attr('redirect')) {
							window.location.href = $(this).attr('redirect');
						}
						else if (typeof(response.message) !== 'undefined') {
							TJ.util.notify(response.message, 6);
						}
						else {
							TJ.util.notify('Success', 6);
						}
					}).catch((error) => {
						TJ.util.notify(error.message);
					});
				}).catch((error) => {
					TJ.util.notify(error.message);
				});
			});
		}
	})
/***
	// Close the cart when the close button is clicked on the cart
	$('body').on('click', '.sidecart-close', function() {
		$(".headlessshoppingcart-pay-cart").removeClass("showheadlessshoppingcart-pay-cart");
		$('html, body').removeClass("noscroll");
	});
/***/


	// Remove the noscroll class when the sidecart is closed
/*	$('body').on('click', '.shopping-overlay.cart:not(.shopping-container)', function() {
				$('html, body').removeClass("noscroll");
	});
*/

	// Close the sidecart when anything else is clicked
	$('body').on('click', '.shopping-overlay.cart', function(event) {
		if (event.target.closest('.shopping-container') == null) {
			$('html').width('unset');
			$('html, body').removeClass("noscroll");
		}
	});

	// Close the cart when the escape key is pressed.
	$(document).keydown(function (event) {
		if (event.key === "Escape") {
			$(".shopping-overlay.cart .shopping-cart-button.continue-shopping").click();
			$('html').width('unset');
			$('html, body').removeClass("noscroll");
		}
	});

	// .sidecart
	$('body').on('click', '.sidecart, .shopping-overlay.cart .shopping-cart-button.continue-shopping', function(event) {
		event.preventDefault();
		if ($('.shopping-overlay.cart').css('display') == 'block') {
			$('html').width('unset');
			$('html, body').removeClass("noscroll");
		}
		else {
			let width = $('html').width();
			$('html, body').addClass("noscroll");
			$('html').width(width);
		}
	});

	// Remove an item from the cart when the remove button is clicked on the item in the cart
	$('body').on('click', '.headlessshoppingcart-pay-cart-content .remove-item', function() {
		$('.cart-hide, .loader').removeClass('hidden');
		$(this).closest(".headlessshoppingcart-pay-cart-item").remove();
		itemId = $(this).closest(".headlessshoppingcart-pay-cart-item").data('itemid');

		TJ.checkout.removeItem({checkoutId: TJ.checkout.id, itemId: itemId}).then(function (res) {
			TJ.checkout.initSidecart(true);
		}).catch(error => {
			TJ.util.notify(error.map(x => x["message"]).join("<br>"))
		});
	});

	// Increase or decrease the amount of an item in the cart when the up or down arrow is clicked on the item in the cart
	$('body').on('click', '.headlessshoppingcart-pay-cart-content .fa-chevron-up, .headlessshoppingcart-pay-cart-content .fa-chevron-down', function() {
		$('.cart-hide, .loader').removeClass('hidden');
		var $this = $(this);
		var $input = $this.closest("div").find("p");
		var quantity = parseInt($input.html());
		var itemId = $(this).parents('.headlessshoppingcart-pay-cart-item').data('itemid');
		if ($this.hasClass("fa-chevron-up")) {
			quantity = quantity + 1;
		} else {
			quantity = quantity - 1;
			if (quantity < 1) {
				quantity = 1;
			}
		}

		// TODO: handle any errors
		TJ.checkout.updateQuantity({
			checkoutId: TJ.checkout.id,
			itemId: itemId,
			quantity: quantity,
		}).then(function(response) {
			TJ.checkout.initSidecart(true);
		}).catch(error => {
			TJ.util.notify(error.map(x => x["message"]).join("<br>"));
			TJ.checkout.initSidecart();
		});
	});

	// Add an item to the cart when the add to cart button is clicked on the item.
	$('body').on('click', '.button-add', function(event) {
		event.preventDefault();

		$('.headlessshoppingcart-pay-cart').addClass('showheadlessshoppingcart-pay-cart');
		$('.cart-hide, .loader').removeClass('hidden');
		$('html, body').addClass("noscroll");

		var prodProps = {checkoutId: TJ.checkout.id, productId: null, quantity: 1, option: null};

		$(this).closest('form').find('input[type=hidden]').each(function(key, inputEl) {
			switch($(inputEl).attr('name')) {
				case 'productid':
					prodProps.productId = $(inputEl).attr('value');
					break;
				case 'option':
					prodProps.option = $(inputEl).attr('value');
					break;
			}
		}, prodProps);

		TJ.checkout.addItem(prodProps).then(function (res) {
			TJ.checkout.initSidecart(true);
		}).catch(error => {
			$('.cart-hide, .loader').addClass('hidden');
			TJ.util.notify(error.map(x => x["message"]).join("<br>"))
		});
	});

	$('body').on('click', '#hide-notification', function() {
		$('#notification-bar').removeClass('show');
	});

	$('body').on('click', '.checkout_incrementicon', function() {
		const itemId = $(this).parents('.checkout__incrementorcontainer').last().siblings('.checkout_itemid').last().attr('data-itemid');

		const item = TJ.checkout.items.filter(function(val, index, arr) {
			return val.id == itemId;
		})[0];

		const itemQuantity = item.quantity;
		const newItemQuantity = parseFloat(itemQuantity) + 1;

		TJ.checkout.updateQuantity({
			checkoutId: TJ.checkout.id,
			itemId: itemId,
			quantity: newItemQuantity,
		}).then(function(response) {
			TJ.util.renderTemplate();
			showHideDecrementTrash();
		}).catch(error => {
			console.error(error);
		});
	});

	$('body').on('click', '.checkout_decrementicon', function() {
		const itemId = $(this).parents('.checkout__incrementorcontainer').last().siblings('.checkout_itemid').last().attr('data-itemid');

		const item = TJ.checkout.items.filter(function(val, index, arr) {
			return val.id == itemId;
		})[0];

		const itemQuantity = item.quantity;
		const newItemQuantity = parseFloat(itemQuantity) - 1;

		if (newItemQuantity == 0) {
			TJ.checkout.removeItem({
				checkoutId: TJ.checkout.id,
				itemId: itemId,
			});
		}
		else {
			TJ.checkout.updateQuantity({
				checkoutId: TJ.checkout.id,
				itemId: itemId,
				quantity: newItemQuantity,
			}).then(function() {
				TJ.util.renderTemplate();
				showHideDecrementTrash();
			}).catch(error => {
				console.error(error);
			});
		}
	});

	$('body').on('click', '.checkout_trashicon', function() {
		const itemId = $(this).parents('.checkout__incrementorcontainer').last().siblings('.checkout_itemid').last().attr('data-itemid');
		TJ.checkout.removeItem({
			checkoutId: TJ.checkout.id,
			itemId: itemId,
		}).then(function() {
			TJ.util.renderTemplate();
		}).catch(error => {
			console.error(error);
		});
	});

	showHideDecrementTrash();

	function showHideDecrementTrash() {
		jQuery('.checkout__incrementorcontainer').each(function() {
			const  itemId = $(this).siblings('.checkout_itemid').attr('data-itemid');

			const item = TJ.checkout.items.filter(function(val, index, arr) {
				return val.id == itemId;
			})[0];

			if (item.quantity > 1) {
				$(this).find('.checkout_decrementicon').removeClass('hidden');
				$(this).find('.checkout_trashicon').addClass('hidden');
			} else {
				$(this).find('.checkout_decrementicon').addClass('hidden');
				$(this).find('.checkout_trashicon').removeClass('hidden');
			}
		});
	}
}

function getTLD(){
	var i,h,
	weird_cookie='weird_get_top_level_domain=cookie',
	hostname = document.location.hostname.split('.');
	for(i=hostname.length-1; i>=0; i--) {
		h = hostname.slice(i).join('.');
		document.cookie = weird_cookie + ';domain=.' + h + ';';
		if(document.cookie.indexOf(weird_cookie)>-1){
			// We were able to store a cookie! This must be it
			document.cookie = weird_cookie.split('=')[0] + '=;domain=.' + h + ';expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			return h;
		}
	}
}

// Debug
function __LINE__() {
	let e = new Error();
	let frame = e.stack.split("\n")[2]; // change to 3 for grandparent func
	let lineNumber = frame.split(":").reverse()[1];
	return lineNumber;
}

function __FUNCTION__() {
	let e = new Error();
	let frame = e.stack.split("\n")[2]; // change to 3 for grandparent func
	let functionName = frame.split(" ")[5];
	return functionName;
}
