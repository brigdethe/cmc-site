//#region src/settings.ts
function e() {
	return {
		physics: {
			gravity: 9.81,
			mass: .72,
			damping: .45,
			mouseForce: 1,
			grip: 100,
			strapStiffness: 90,
			antiTwist: 2.2,
			twistProgression: 3,
			swivelDamping: .15
		},
		material: {
			wear: .2,
			edgeDamage: .55,
			roughness: .012,
			transmission: 1,
			thickness: .006,
			metalRoughness: .2,
			strapColor: "#000000",
			unlitArtwork: !0
		},
		lighting: {
			exposure: 1,
			keyLight: 2.5,
			reflections: .9,
			shadow: .13
		},
		background: {
			color: "#ffffff",
			transparent: !0,
			filterBackground: !1
		},
		filters: {
			enabled: !1,
			dither: 1,
			levels: 4,
			ditherSize: 2,
			pixelSize: 1,
			grain: 0,
			monochrome: 0,
			sepia: 0,
			vignette: 0
		},
		plotter: {
			enabled: !1,
			strength: 1,
			strokeWidth: 5,
			edgeSoftness: .35,
			lineBlend: .5,
			direction: 0,
			colorSteps: 6,
			inkVariation: .55
		},
		view: {
			angle: 0,
			zoom: 1
		},
		paused: !1
	};
}
//#endregion
//#region src/queue.ts
function t() {
	let e = Promise.resolve();
	return (t) => {
		let n = e.then(t);
		return e = n.catch(() => void 0), n;
	};
}
//#endregion
//#region node_modules/qrcode-generator/dist/qrcode.mjs
var n = function(e, t) {
	let n = e, r = i[t], a = null, s = 0, h = null, g = [], _ = {}, v = function(e, t) {
		s = n * 4 + 17, a = function(e) {
			let t = Array(e);
			for (let n = 0; n < e; n += 1) {
				t[n] = Array(e);
				for (let r = 0; r < e; r += 1) t[n][r] = null;
			}
			return t;
		}(s), b(0, 0), b(s - 7, 0), b(0, s - 7), C(), S(), T(e, t), n >= 7 && w(e), h ??= O(n, r, g), E(h, t);
	}, b = function(e, t) {
		for (let n = -1; n <= 7; n += 1) if (!(e + n <= -1 || s <= e + n)) for (let r = -1; r <= 7; r += 1) t + r <= -1 || s <= t + r || (0 <= n && n <= 6 && (r == 0 || r == 6) || 0 <= r && r <= 6 && (n == 0 || n == 6) || 2 <= n && n <= 4 && 2 <= r && r <= 4 ? a[e + n][t + r] = !0 : a[e + n][t + r] = !1);
	}, x = function() {
		let e = 0, t = 0;
		for (let n = 0; n < 8; n += 1) {
			v(!0, n);
			let r = o.getLostPoint(_);
			(n == 0 || e > r) && (e = r, t = n);
		}
		return t;
	}, S = function() {
		for (let e = 8; e < s - 8; e += 1) a[e][6] ?? (a[e][6] = e % 2 == 0);
		for (let e = 8; e < s - 8; e += 1) a[6][e] ?? (a[6][e] = e % 2 == 0);
	}, C = function() {
		let e = o.getPatternPosition(n);
		for (let t = 0; t < e.length; t += 1) for (let n = 0; n < e.length; n += 1) {
			let r = e[t], i = e[n];
			if (a[r][i] == null) for (let e = -2; e <= 2; e += 1) for (let t = -2; t <= 2; t += 1) e == -2 || e == 2 || t == -2 || t == 2 || e == 0 && t == 0 ? a[r + e][i + t] = !0 : a[r + e][i + t] = !1;
		}
	}, w = function(e) {
		let t = o.getBCHTypeNumber(n);
		for (let n = 0; n < 18; n += 1) {
			let r = !e && (t >> n & 1) == 1;
			a[Math.floor(n / 3)][n % 3 + s - 8 - 3] = r;
		}
		for (let n = 0; n < 18; n += 1) {
			let r = !e && (t >> n & 1) == 1;
			a[n % 3 + s - 8 - 3][Math.floor(n / 3)] = r;
		}
	}, T = function(e, t) {
		let n = r << 3 | t, i = o.getBCHTypeInfo(n);
		for (let t = 0; t < 15; t += 1) {
			let n = !e && (i >> t & 1) == 1;
			t < 6 ? a[t][8] = n : t < 8 ? a[t + 1][8] = n : a[s - 15 + t][8] = n;
		}
		for (let t = 0; t < 15; t += 1) {
			let n = !e && (i >> t & 1) == 1;
			t < 8 ? a[8][s - t - 1] = n : t < 9 ? a[8][15 - t - 1 + 1] = n : a[8][15 - t - 1] = n;
		}
		a[s - 8][8] = !e;
	}, E = function(e, t) {
		let n = -1, r = s - 1, i = 7, c = 0, l = o.getMaskFunction(t);
		for (let t = s - 1; t > 0; t -= 2) for (t == 6 && --t;;) {
			for (let n = 0; n < 2; n += 1) if (a[r][t - n] == null) {
				let o = !1;
				c < e.length && (o = (e[c] >>> i & 1) == 1), l(r, t - n) && (o = !o), a[r][t - n] = o, --i, i == -1 && (c += 1, i = 7);
			}
			if (r += n, r < 0 || s <= r) {
				r -= n, n = -n;
				break;
			}
		}
	}, D = function(e, t) {
		let n = 0, r = 0, i = 0, a = Array(t.length), s = Array(t.length);
		for (let l = 0; l < t.length; l += 1) {
			let u = t[l].dataCount, d = t[l].totalCount - u;
			r = Math.max(r, u), i = Math.max(i, d), a[l] = Array(u);
			for (let t = 0; t < a[l].length; t += 1) a[l][t] = 255 & e.getBuffer()[t + n];
			n += u;
			let f = o.getErrorCorrectPolynomial(d), p = c(a[l], f.getLength() - 1).mod(f);
			s[l] = Array(f.getLength() - 1);
			for (let e = 0; e < s[l].length; e += 1) {
				let t = e + p.getLength() - s[l].length;
				s[l][e] = t >= 0 ? p.getAt(t) : 0;
			}
		}
		let l = 0;
		for (let e = 0; e < t.length; e += 1) l += t[e].totalCount;
		let u = Array(l), d = 0;
		for (let e = 0; e < r; e += 1) for (let n = 0; n < t.length; n += 1) e < a[n].length && (u[d] = a[n][e], d += 1);
		for (let e = 0; e < i; e += 1) for (let n = 0; n < t.length; n += 1) e < s[n].length && (u[d] = s[n][e], d += 1);
		return u;
	}, O = function(e, t, n) {
		let r = l.getRSBlocks(e, t), i = u();
		for (let t = 0; t < n.length; t += 1) {
			let r = n[t];
			i.put(r.getMode(), 4), i.put(r.getLength(), o.getLengthInBits(r.getMode(), e)), r.write(i);
		}
		let a = 0;
		for (let e = 0; e < r.length; e += 1) a += r[e].dataCount;
		if (i.getLengthInBits() > a * 8) throw "code length overflow. (" + i.getLengthInBits() + ">" + a * 8 + ")";
		for (i.getLengthInBits() + 4 <= a * 8 && i.put(0, 4); i.getLengthInBits() % 8 != 0;) i.putBit(!1);
		for (; !(i.getLengthInBits() >= a * 8 || (i.put(236, 8), i.getLengthInBits() >= a * 8));) i.put(17, 8);
		return D(i, r);
	};
	_.addData = function(e, t) {
		t ||= "Byte";
		let n = null;
		switch (t) {
			case "Numeric":
				n = d(e);
				break;
			case "Alphanumeric":
				n = f(e);
				break;
			case "Byte":
				n = p(e);
				break;
			case "Kanji":
				n = m(e);
				break;
			default: throw "mode:" + t;
		}
		g.push(n), h = null;
	}, _.isDark = function(e, t) {
		if (e < 0 || s <= e || t < 0 || s <= t) throw e + "," + t;
		return a[e][t];
	}, _.getModuleCount = function() {
		return s;
	}, _.make = function() {
		if (n < 1) {
			let e = 1;
			for (; e < 40; e++) {
				let t = l.getRSBlocks(e, r), n = u();
				for (let t = 0; t < g.length; t++) {
					let r = g[t];
					n.put(r.getMode(), 4), n.put(r.getLength(), o.getLengthInBits(r.getMode(), e)), r.write(n);
				}
				let i = 0;
				for (let e = 0; e < t.length; e++) i += t[e].dataCount;
				if (n.getLengthInBits() <= i * 8) break;
			}
			n = e;
		}
		v(!1, x());
	}, _.createTableTag = function(e, t) {
		e ||= 2, t = t === void 0 ? e * 4 : t;
		let n = "";
		n += "<table style=\"", n += " border-width: 0px; border-style: none;", n += " border-collapse: collapse;", n += " padding: 0px; margin: " + t + "px;", n += "\">", n += "<tbody>";
		for (let t = 0; t < _.getModuleCount(); t += 1) {
			n += "<tr>";
			for (let r = 0; r < _.getModuleCount(); r += 1) n += "<td style=\"", n += " border-width: 0px; border-style: none;", n += " border-collapse: collapse;", n += " padding: 0px; margin: 0px;", n += " width: " + e + "px;", n += " height: " + e + "px;", n += " background-color: ", n += _.isDark(t, r) ? "#000000" : "#ffffff", n += ";", n += "\"/>";
			n += "</tr>";
		}
		return n += "</tbody>", n += "</table>", n;
	}, _.createSvgTag = function(e, t, n, r) {
		let i = {};
		typeof arguments[0] == "object" && (i = arguments[0], e = i.cellSize, t = i.margin, n = i.alt, r = i.title), e ||= 2, t = t === void 0 ? e * 4 : t, n = typeof n == "string" ? { text: n } : n || {}, n.text = n.text || null, n.id = n.text ? n.id || "qrcode-description" : null, r = typeof r == "string" ? { text: r } : r || {}, r.text = r.text || null, r.id = r.text ? r.id || "qrcode-title" : null;
		let a = _.getModuleCount() * e + t * 2, o, s, c, l, u = "", d;
		for (d = "l" + e + ",0 0," + e + " -" + e + ",0 0,-" + e + "z ", u += "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"", u += i.scalable ? "" : " width=\"" + a + "px\" height=\"" + a + "px\"", u += " viewBox=\"0 0 " + a + " " + a + "\" ", u += " preserveAspectRatio=\"xMinYMin meet\"", u += r.text || n.text ? " role=\"img\" aria-labelledby=\"" + k([r.id, n.id].join(" ").trim()) + "\"" : "", u += ">", u += r.text ? "<title id=\"" + k(r.id) + "\">" + k(r.text) + "</title>" : "", u += n.text ? "<description id=\"" + k(n.id) + "\">" + k(n.text) + "</description>" : "", u += "<rect width=\"100%\" height=\"100%\" fill=\"white\" cx=\"0\" cy=\"0\"/>", u += "<path d=\"", c = 0; c < _.getModuleCount(); c += 1) for (l = c * e + t, o = 0; o < _.getModuleCount(); o += 1) _.isDark(c, o) && (s = o * e + t, u += "M" + s + "," + l + d);
		return u += "\" stroke=\"transparent\" fill=\"black\"/>", u += "</svg>", u;
	}, _.createDataURL = function(e, t) {
		e ||= 2, t = t === void 0 ? e * 4 : t;
		let n = _.getModuleCount() * e + t * 2, r = t, i = n - t;
		return y(n, n, function(t, n) {
			if (r <= t && t < i && r <= n && n < i) {
				let i = Math.floor((t - r) / e), a = Math.floor((n - r) / e);
				return +!_.isDark(a, i);
			}
			return 1;
		});
	}, _.createImgTag = function(e, t, n) {
		e ||= 2, t = t === void 0 ? e * 4 : t;
		let r = _.getModuleCount() * e + t * 2, i = "";
		return i += "<img", i += " src=\"", i += _.createDataURL(e, t), i += "\"", i += " width=\"", i += r, i += "\"", i += " height=\"", i += r, i += "\"", n && (i += " alt=\"", i += k(n), i += "\""), i += "/>", i;
	};
	let k = function(e) {
		let t = "";
		for (let n = 0; n < e.length; n += 1) {
			let r = e.charAt(n);
			switch (r) {
				case "<":
					t += "&lt;";
					break;
				case ">":
					t += "&gt;";
					break;
				case "&":
					t += "&amp;";
					break;
				case "\"":
					t += "&quot;";
					break;
				default: t += r;
			}
		}
		return t;
	}, A = function(e) {
		e = e === void 0 ? 2 : e;
		let t = _.getModuleCount() * 1 + e * 2, n = e, r = t - e, i, a, o, s, c, l = {
			"██": "█",
			"█ ": "▀",
			" █": "▄",
			"  ": " "
		}, u = {
			"██": "▀",
			"█ ": "▀",
			" █": " ",
			"  ": " "
		}, d = "";
		for (i = 0; i < t; i += 2) {
			for (o = Math.floor((i - n) / 1), s = Math.floor((i + 1 - n) / 1), a = 0; a < t; a += 1) c = "█", n <= a && a < r && n <= i && i < r && _.isDark(o, Math.floor((a - n) / 1)) && (c = " "), n <= a && a < r && n <= i + 1 && i + 1 < r && _.isDark(s, Math.floor((a - n) / 1)) ? c += " " : c += "█", d += e < 1 && i + 1 >= r ? u[c] : l[c];
			d += "\n";
		}
		return t % 2 && e > 0 ? d.substring(0, d.length - t - 1) + Array(t + 1).join("▀") : d.substring(0, d.length - 1);
	};
	return _.createASCII = function(e, t) {
		if (e ||= 1, e < 2) return A(t);
		--e, t = t === void 0 ? e * 2 : t;
		let n = _.getModuleCount() * e + t * 2, r = t, i = n - t, a, o, s, c, l = Array(e + 1).join("██"), u = Array(e + 1).join("  "), d = "", f = "";
		for (a = 0; a < n; a += 1) {
			for (s = Math.floor((a - r) / e), f = "", o = 0; o < n; o += 1) c = 1, r <= o && o < i && r <= a && a < i && _.isDark(s, Math.floor((o - r) / e)) && (c = 0), f += c ? l : u;
			for (s = 0; s < e; s += 1) d += f + "\n";
		}
		return d.substring(0, d.length - 1);
	}, _.renderTo2dContext = function(e, t) {
		t ||= 2;
		let n = _.getModuleCount();
		for (let r = 0; r < n; r++) for (let i = 0; i < n; i++) e.fillStyle = _.isDark(r, i) ? "black" : "white", e.fillRect(i * t, r * t, t, t);
	}, _;
};
n.stringToBytes = function(e) {
	let t = [];
	for (let n = 0; n < e.length; n += 1) {
		let r = e.charCodeAt(n);
		t.push(r & 255);
	}
	return t;
}, n.createStringToBytes = function(e, t) {
	let n = function() {
		let n = _(e), r = function() {
			let e = n.read();
			if (e == -1) throw "eof";
			return e;
		}, i = 0, a = {};
		for (;;) {
			let e = n.read();
			if (e == -1) break;
			let t = r(), o = r(), s = r(), c = String.fromCharCode(e << 8 | t);
			a[c] = o << 8 | s, i += 1;
		}
		if (i != t) throw i + " != " + t;
		return a;
	}();
	return function(e) {
		let t = [];
		for (let r = 0; r < e.length; r += 1) {
			let i = e.charCodeAt(r);
			if (i < 128) t.push(i);
			else {
				let i = n[e.charAt(r)];
				typeof i == "number" ? (i & 255) == i ? t.push(i) : (t.push(i >>> 8), t.push(i & 255)) : t.push(63);
			}
		}
		return t;
	};
};
var r = {
	MODE_NUMBER: 1,
	MODE_ALPHA_NUM: 2,
	MODE_8BIT_BYTE: 4,
	MODE_KANJI: 8
}, i = {
	L: 1,
	M: 0,
	Q: 3,
	H: 2
}, a = {
	PATTERN000: 0,
	PATTERN001: 1,
	PATTERN010: 2,
	PATTERN011: 3,
	PATTERN100: 4,
	PATTERN101: 5,
	PATTERN110: 6,
	PATTERN111: 7
}, o = function() {
	let e = [
		[],
		[6, 18],
		[6, 22],
		[6, 26],
		[6, 30],
		[6, 34],
		[
			6,
			22,
			38
		],
		[
			6,
			24,
			42
		],
		[
			6,
			26,
			46
		],
		[
			6,
			28,
			50
		],
		[
			6,
			30,
			54
		],
		[
			6,
			32,
			58
		],
		[
			6,
			34,
			62
		],
		[
			6,
			26,
			46,
			66
		],
		[
			6,
			26,
			48,
			70
		],
		[
			6,
			26,
			50,
			74
		],
		[
			6,
			30,
			54,
			78
		],
		[
			6,
			30,
			56,
			82
		],
		[
			6,
			30,
			58,
			86
		],
		[
			6,
			34,
			62,
			90
		],
		[
			6,
			28,
			50,
			72,
			94
		],
		[
			6,
			26,
			50,
			74,
			98
		],
		[
			6,
			30,
			54,
			78,
			102
		],
		[
			6,
			28,
			54,
			80,
			106
		],
		[
			6,
			32,
			58,
			84,
			110
		],
		[
			6,
			30,
			58,
			86,
			114
		],
		[
			6,
			34,
			62,
			90,
			118
		],
		[
			6,
			26,
			50,
			74,
			98,
			122
		],
		[
			6,
			30,
			54,
			78,
			102,
			126
		],
		[
			6,
			26,
			52,
			78,
			104,
			130
		],
		[
			6,
			30,
			56,
			82,
			108,
			134
		],
		[
			6,
			34,
			60,
			86,
			112,
			138
		],
		[
			6,
			30,
			58,
			86,
			114,
			142
		],
		[
			6,
			34,
			62,
			90,
			118,
			146
		],
		[
			6,
			30,
			54,
			78,
			102,
			126,
			150
		],
		[
			6,
			24,
			50,
			76,
			102,
			128,
			154
		],
		[
			6,
			28,
			54,
			80,
			106,
			132,
			158
		],
		[
			6,
			32,
			58,
			84,
			110,
			136,
			162
		],
		[
			6,
			26,
			54,
			82,
			110,
			138,
			166
		],
		[
			6,
			30,
			58,
			86,
			114,
			142,
			170
		]
	], t = 1335, n = 7973, i = {}, o = function(e) {
		let t = 0;
		for (; e != 0;) t += 1, e >>>= 1;
		return t;
	};
	return i.getBCHTypeInfo = function(e) {
		let n = e << 10;
		for (; o(n) - o(t) >= 0;) n ^= t << o(n) - o(t);
		return (e << 10 | n) ^ 21522;
	}, i.getBCHTypeNumber = function(e) {
		let t = e << 12;
		for (; o(t) - o(n) >= 0;) t ^= n << o(t) - o(n);
		return e << 12 | t;
	}, i.getPatternPosition = function(t) {
		return e[t - 1];
	}, i.getMaskFunction = function(e) {
		switch (e) {
			case a.PATTERN000: return function(e, t) {
				return (e + t) % 2 == 0;
			};
			case a.PATTERN001: return function(e, t) {
				return e % 2 == 0;
			};
			case a.PATTERN010: return function(e, t) {
				return t % 3 == 0;
			};
			case a.PATTERN011: return function(e, t) {
				return (e + t) % 3 == 0;
			};
			case a.PATTERN100: return function(e, t) {
				return (Math.floor(e / 2) + Math.floor(t / 3)) % 2 == 0;
			};
			case a.PATTERN101: return function(e, t) {
				return e * t % 2 + e * t % 3 == 0;
			};
			case a.PATTERN110: return function(e, t) {
				return (e * t % 2 + e * t % 3) % 2 == 0;
			};
			case a.PATTERN111: return function(e, t) {
				return (e * t % 3 + (e + t) % 2) % 2 == 0;
			};
			default: throw "bad maskPattern:" + e;
		}
	}, i.getErrorCorrectPolynomial = function(e) {
		let t = c([1], 0);
		for (let n = 0; n < e; n += 1) t = t.multiply(c([1, s.gexp(n)], 0));
		return t;
	}, i.getLengthInBits = function(e, t) {
		if (1 <= t && t < 10) switch (e) {
			case r.MODE_NUMBER: return 10;
			case r.MODE_ALPHA_NUM: return 9;
			case r.MODE_8BIT_BYTE: return 8;
			case r.MODE_KANJI: return 8;
			default: throw "mode:" + e;
		}
		else if (t < 27) switch (e) {
			case r.MODE_NUMBER: return 12;
			case r.MODE_ALPHA_NUM: return 11;
			case r.MODE_8BIT_BYTE: return 16;
			case r.MODE_KANJI: return 10;
			default: throw "mode:" + e;
		}
		else if (t < 41) switch (e) {
			case r.MODE_NUMBER: return 14;
			case r.MODE_ALPHA_NUM: return 13;
			case r.MODE_8BIT_BYTE: return 16;
			case r.MODE_KANJI: return 12;
			default: throw "mode:" + e;
		}
		else throw "type:" + t;
	}, i.getLostPoint = function(e) {
		let t = e.getModuleCount(), n = 0;
		for (let r = 0; r < t; r += 1) for (let i = 0; i < t; i += 1) {
			let a = 0, o = e.isDark(r, i);
			for (let n = -1; n <= 1; n += 1) if (!(r + n < 0 || t <= r + n)) for (let s = -1; s <= 1; s += 1) i + s < 0 || t <= i + s || (n != 0 || s != 0) && o == e.isDark(r + n, i + s) && (a += 1);
			a > 5 && (n += 3 + a - 5);
		}
		for (let r = 0; r < t - 1; r += 1) for (let i = 0; i < t - 1; i += 1) {
			let t = 0;
			e.isDark(r, i) && (t += 1), e.isDark(r + 1, i) && (t += 1), e.isDark(r, i + 1) && (t += 1), e.isDark(r + 1, i + 1) && (t += 1), (t == 0 || t == 4) && (n += 3);
		}
		for (let r = 0; r < t; r += 1) for (let i = 0; i < t - 6; i += 1) e.isDark(r, i) && !e.isDark(r, i + 1) && e.isDark(r, i + 2) && e.isDark(r, i + 3) && e.isDark(r, i + 4) && !e.isDark(r, i + 5) && e.isDark(r, i + 6) && (n += 40);
		for (let r = 0; r < t; r += 1) for (let i = 0; i < t - 6; i += 1) e.isDark(i, r) && !e.isDark(i + 1, r) && e.isDark(i + 2, r) && e.isDark(i + 3, r) && e.isDark(i + 4, r) && !e.isDark(i + 5, r) && e.isDark(i + 6, r) && (n += 40);
		let r = 0;
		for (let n = 0; n < t; n += 1) for (let i = 0; i < t; i += 1) e.isDark(i, n) && (r += 1);
		let i = Math.abs(100 * r / t / t - 50) / 5;
		return n += i * 10, n;
	}, i;
}(), s = function() {
	let e = Array(256), t = Array(256);
	for (let t = 0; t < 8; t += 1) e[t] = 1 << t;
	for (let t = 8; t < 256; t += 1) e[t] = e[t - 4] ^ e[t - 5] ^ e[t - 6] ^ e[t - 8];
	for (let n = 0; n < 255; n += 1) t[e[n]] = n;
	let n = {};
	return n.glog = function(e) {
		if (e < 1) throw "glog(" + e + ")";
		return t[e];
	}, n.gexp = function(t) {
		for (; t < 0;) t += 255;
		for (; t >= 256;) t -= 255;
		return e[t];
	}, n;
}(), c = function(e, t) {
	if (e.length === void 0) throw e.length + "/" + t;
	let n = function() {
		let n = 0;
		for (; n < e.length && e[n] == 0;) n += 1;
		let r = Array(e.length - n + t);
		for (let t = 0; t < e.length - n; t += 1) r[t] = e[t + n];
		return r;
	}(), r = {};
	return r.getAt = function(e) {
		return n[e];
	}, r.getLength = function() {
		return n.length;
	}, r.multiply = function(e) {
		let t = Array(r.getLength() + e.getLength() - 1);
		for (let n = 0; n < r.getLength(); n += 1) for (let i = 0; i < e.getLength(); i += 1) t[n + i] ^= s.gexp(s.glog(r.getAt(n)) + s.glog(e.getAt(i)));
		return c(t, 0);
	}, r.mod = function(e) {
		if (r.getLength() - e.getLength() < 0) return r;
		let t = s.glog(r.getAt(0)) - s.glog(e.getAt(0)), n = Array(r.getLength());
		for (let e = 0; e < r.getLength(); e += 1) n[e] = r.getAt(e);
		for (let r = 0; r < e.getLength(); r += 1) n[r] ^= s.gexp(s.glog(e.getAt(r)) + t);
		return c(n, 0).mod(e);
	}, r;
}, l = function() {
	let e = [
		[
			1,
			26,
			19
		],
		[
			1,
			26,
			16
		],
		[
			1,
			26,
			13
		],
		[
			1,
			26,
			9
		],
		[
			1,
			44,
			34
		],
		[
			1,
			44,
			28
		],
		[
			1,
			44,
			22
		],
		[
			1,
			44,
			16
		],
		[
			1,
			70,
			55
		],
		[
			1,
			70,
			44
		],
		[
			2,
			35,
			17
		],
		[
			2,
			35,
			13
		],
		[
			1,
			100,
			80
		],
		[
			2,
			50,
			32
		],
		[
			2,
			50,
			24
		],
		[
			4,
			25,
			9
		],
		[
			1,
			134,
			108
		],
		[
			2,
			67,
			43
		],
		[
			2,
			33,
			15,
			2,
			34,
			16
		],
		[
			2,
			33,
			11,
			2,
			34,
			12
		],
		[
			2,
			86,
			68
		],
		[
			4,
			43,
			27
		],
		[
			4,
			43,
			19
		],
		[
			4,
			43,
			15
		],
		[
			2,
			98,
			78
		],
		[
			4,
			49,
			31
		],
		[
			2,
			32,
			14,
			4,
			33,
			15
		],
		[
			4,
			39,
			13,
			1,
			40,
			14
		],
		[
			2,
			121,
			97
		],
		[
			2,
			60,
			38,
			2,
			61,
			39
		],
		[
			4,
			40,
			18,
			2,
			41,
			19
		],
		[
			4,
			40,
			14,
			2,
			41,
			15
		],
		[
			2,
			146,
			116
		],
		[
			3,
			58,
			36,
			2,
			59,
			37
		],
		[
			4,
			36,
			16,
			4,
			37,
			17
		],
		[
			4,
			36,
			12,
			4,
			37,
			13
		],
		[
			2,
			86,
			68,
			2,
			87,
			69
		],
		[
			4,
			69,
			43,
			1,
			70,
			44
		],
		[
			6,
			43,
			19,
			2,
			44,
			20
		],
		[
			6,
			43,
			15,
			2,
			44,
			16
		],
		[
			4,
			101,
			81
		],
		[
			1,
			80,
			50,
			4,
			81,
			51
		],
		[
			4,
			50,
			22,
			4,
			51,
			23
		],
		[
			3,
			36,
			12,
			8,
			37,
			13
		],
		[
			2,
			116,
			92,
			2,
			117,
			93
		],
		[
			6,
			58,
			36,
			2,
			59,
			37
		],
		[
			4,
			46,
			20,
			6,
			47,
			21
		],
		[
			7,
			42,
			14,
			4,
			43,
			15
		],
		[
			4,
			133,
			107
		],
		[
			8,
			59,
			37,
			1,
			60,
			38
		],
		[
			8,
			44,
			20,
			4,
			45,
			21
		],
		[
			12,
			33,
			11,
			4,
			34,
			12
		],
		[
			3,
			145,
			115,
			1,
			146,
			116
		],
		[
			4,
			64,
			40,
			5,
			65,
			41
		],
		[
			11,
			36,
			16,
			5,
			37,
			17
		],
		[
			11,
			36,
			12,
			5,
			37,
			13
		],
		[
			5,
			109,
			87,
			1,
			110,
			88
		],
		[
			5,
			65,
			41,
			5,
			66,
			42
		],
		[
			5,
			54,
			24,
			7,
			55,
			25
		],
		[
			11,
			36,
			12,
			7,
			37,
			13
		],
		[
			5,
			122,
			98,
			1,
			123,
			99
		],
		[
			7,
			73,
			45,
			3,
			74,
			46
		],
		[
			15,
			43,
			19,
			2,
			44,
			20
		],
		[
			3,
			45,
			15,
			13,
			46,
			16
		],
		[
			1,
			135,
			107,
			5,
			136,
			108
		],
		[
			10,
			74,
			46,
			1,
			75,
			47
		],
		[
			1,
			50,
			22,
			15,
			51,
			23
		],
		[
			2,
			42,
			14,
			17,
			43,
			15
		],
		[
			5,
			150,
			120,
			1,
			151,
			121
		],
		[
			9,
			69,
			43,
			4,
			70,
			44
		],
		[
			17,
			50,
			22,
			1,
			51,
			23
		],
		[
			2,
			42,
			14,
			19,
			43,
			15
		],
		[
			3,
			141,
			113,
			4,
			142,
			114
		],
		[
			3,
			70,
			44,
			11,
			71,
			45
		],
		[
			17,
			47,
			21,
			4,
			48,
			22
		],
		[
			9,
			39,
			13,
			16,
			40,
			14
		],
		[
			3,
			135,
			107,
			5,
			136,
			108
		],
		[
			3,
			67,
			41,
			13,
			68,
			42
		],
		[
			15,
			54,
			24,
			5,
			55,
			25
		],
		[
			15,
			43,
			15,
			10,
			44,
			16
		],
		[
			4,
			144,
			116,
			4,
			145,
			117
		],
		[
			17,
			68,
			42
		],
		[
			17,
			50,
			22,
			6,
			51,
			23
		],
		[
			19,
			46,
			16,
			6,
			47,
			17
		],
		[
			2,
			139,
			111,
			7,
			140,
			112
		],
		[
			17,
			74,
			46
		],
		[
			7,
			54,
			24,
			16,
			55,
			25
		],
		[
			34,
			37,
			13
		],
		[
			4,
			151,
			121,
			5,
			152,
			122
		],
		[
			4,
			75,
			47,
			14,
			76,
			48
		],
		[
			11,
			54,
			24,
			14,
			55,
			25
		],
		[
			16,
			45,
			15,
			14,
			46,
			16
		],
		[
			6,
			147,
			117,
			4,
			148,
			118
		],
		[
			6,
			73,
			45,
			14,
			74,
			46
		],
		[
			11,
			54,
			24,
			16,
			55,
			25
		],
		[
			30,
			46,
			16,
			2,
			47,
			17
		],
		[
			8,
			132,
			106,
			4,
			133,
			107
		],
		[
			8,
			75,
			47,
			13,
			76,
			48
		],
		[
			7,
			54,
			24,
			22,
			55,
			25
		],
		[
			22,
			45,
			15,
			13,
			46,
			16
		],
		[
			10,
			142,
			114,
			2,
			143,
			115
		],
		[
			19,
			74,
			46,
			4,
			75,
			47
		],
		[
			28,
			50,
			22,
			6,
			51,
			23
		],
		[
			33,
			46,
			16,
			4,
			47,
			17
		],
		[
			8,
			152,
			122,
			4,
			153,
			123
		],
		[
			22,
			73,
			45,
			3,
			74,
			46
		],
		[
			8,
			53,
			23,
			26,
			54,
			24
		],
		[
			12,
			45,
			15,
			28,
			46,
			16
		],
		[
			3,
			147,
			117,
			10,
			148,
			118
		],
		[
			3,
			73,
			45,
			23,
			74,
			46
		],
		[
			4,
			54,
			24,
			31,
			55,
			25
		],
		[
			11,
			45,
			15,
			31,
			46,
			16
		],
		[
			7,
			146,
			116,
			7,
			147,
			117
		],
		[
			21,
			73,
			45,
			7,
			74,
			46
		],
		[
			1,
			53,
			23,
			37,
			54,
			24
		],
		[
			19,
			45,
			15,
			26,
			46,
			16
		],
		[
			5,
			145,
			115,
			10,
			146,
			116
		],
		[
			19,
			75,
			47,
			10,
			76,
			48
		],
		[
			15,
			54,
			24,
			25,
			55,
			25
		],
		[
			23,
			45,
			15,
			25,
			46,
			16
		],
		[
			13,
			145,
			115,
			3,
			146,
			116
		],
		[
			2,
			74,
			46,
			29,
			75,
			47
		],
		[
			42,
			54,
			24,
			1,
			55,
			25
		],
		[
			23,
			45,
			15,
			28,
			46,
			16
		],
		[
			17,
			145,
			115
		],
		[
			10,
			74,
			46,
			23,
			75,
			47
		],
		[
			10,
			54,
			24,
			35,
			55,
			25
		],
		[
			19,
			45,
			15,
			35,
			46,
			16
		],
		[
			17,
			145,
			115,
			1,
			146,
			116
		],
		[
			14,
			74,
			46,
			21,
			75,
			47
		],
		[
			29,
			54,
			24,
			19,
			55,
			25
		],
		[
			11,
			45,
			15,
			46,
			46,
			16
		],
		[
			13,
			145,
			115,
			6,
			146,
			116
		],
		[
			14,
			74,
			46,
			23,
			75,
			47
		],
		[
			44,
			54,
			24,
			7,
			55,
			25
		],
		[
			59,
			46,
			16,
			1,
			47,
			17
		],
		[
			12,
			151,
			121,
			7,
			152,
			122
		],
		[
			12,
			75,
			47,
			26,
			76,
			48
		],
		[
			39,
			54,
			24,
			14,
			55,
			25
		],
		[
			22,
			45,
			15,
			41,
			46,
			16
		],
		[
			6,
			151,
			121,
			14,
			152,
			122
		],
		[
			6,
			75,
			47,
			34,
			76,
			48
		],
		[
			46,
			54,
			24,
			10,
			55,
			25
		],
		[
			2,
			45,
			15,
			64,
			46,
			16
		],
		[
			17,
			152,
			122,
			4,
			153,
			123
		],
		[
			29,
			74,
			46,
			14,
			75,
			47
		],
		[
			49,
			54,
			24,
			10,
			55,
			25
		],
		[
			24,
			45,
			15,
			46,
			46,
			16
		],
		[
			4,
			152,
			122,
			18,
			153,
			123
		],
		[
			13,
			74,
			46,
			32,
			75,
			47
		],
		[
			48,
			54,
			24,
			14,
			55,
			25
		],
		[
			42,
			45,
			15,
			32,
			46,
			16
		],
		[
			20,
			147,
			117,
			4,
			148,
			118
		],
		[
			40,
			75,
			47,
			7,
			76,
			48
		],
		[
			43,
			54,
			24,
			22,
			55,
			25
		],
		[
			10,
			45,
			15,
			67,
			46,
			16
		],
		[
			19,
			148,
			118,
			6,
			149,
			119
		],
		[
			18,
			75,
			47,
			31,
			76,
			48
		],
		[
			34,
			54,
			24,
			34,
			55,
			25
		],
		[
			20,
			45,
			15,
			61,
			46,
			16
		]
	], t = function(e, t) {
		let n = {};
		return n.totalCount = e, n.dataCount = t, n;
	}, n = {}, r = function(t, n) {
		switch (n) {
			case i.L: return e[(t - 1) * 4 + 0];
			case i.M: return e[(t - 1) * 4 + 1];
			case i.Q: return e[(t - 1) * 4 + 2];
			case i.H: return e[(t - 1) * 4 + 3];
			default: return;
		}
	};
	return n.getRSBlocks = function(e, n) {
		let i = r(e, n);
		if (i === void 0) throw "bad rs block @ typeNumber:" + e + "/errorCorrectionLevel:" + n;
		let a = i.length / 3, o = [];
		for (let e = 0; e < a; e += 1) {
			let n = i[e * 3 + 0], r = i[e * 3 + 1], a = i[e * 3 + 2];
			for (let e = 0; e < n; e += 1) o.push(t(r, a));
		}
		return o;
	}, n;
}(), u = function() {
	let e = [], t = 0, n = {};
	return n.getBuffer = function() {
		return e;
	}, n.getAt = function(t) {
		let n = Math.floor(t / 8);
		return (e[n] >>> 7 - t % 8 & 1) == 1;
	}, n.put = function(e, t) {
		for (let r = 0; r < t; r += 1) n.putBit((e >>> t - r - 1 & 1) == 1);
	}, n.getLengthInBits = function() {
		return t;
	}, n.putBit = function(n) {
		let r = Math.floor(t / 8);
		e.length <= r && e.push(0), n && (e[r] |= 128 >>> t % 8), t += 1;
	}, n;
}, d = function(e) {
	let t = r.MODE_NUMBER, n = e, i = {};
	i.getMode = function() {
		return t;
	}, i.getLength = function(e) {
		return n.length;
	}, i.write = function(e) {
		let t = n, r = 0;
		for (; r + 2 < t.length;) e.put(a(t.substring(r, r + 3)), 10), r += 3;
		r < t.length && (t.length - r == 1 ? e.put(a(t.substring(r, r + 1)), 4) : t.length - r == 2 && e.put(a(t.substring(r, r + 2)), 7));
	};
	let a = function(e) {
		let t = 0;
		for (let n = 0; n < e.length; n += 1) t = t * 10 + o(e.charAt(n));
		return t;
	}, o = function(e) {
		if ("0" <= e && e <= "9") return e.charCodeAt(0) - 48;
		throw "illegal char :" + e;
	};
	return i;
}, f = function(e) {
	let t = r.MODE_ALPHA_NUM, n = e, i = {};
	i.getMode = function() {
		return t;
	}, i.getLength = function(e) {
		return n.length;
	}, i.write = function(e) {
		let t = n, r = 0;
		for (; r + 1 < t.length;) e.put(a(t.charAt(r)) * 45 + a(t.charAt(r + 1)), 11), r += 2;
		r < t.length && e.put(a(t.charAt(r)), 6);
	};
	let a = function(e) {
		if ("0" <= e && e <= "9") return e.charCodeAt(0) - 48;
		if ("A" <= e && e <= "Z") return e.charCodeAt(0) - 65 + 10;
		switch (e) {
			case " ": return 36;
			case "$": return 37;
			case "%": return 38;
			case "*": return 39;
			case "+": return 40;
			case "-": return 41;
			case ".": return 42;
			case "/": return 43;
			case ":": return 44;
			default: throw "illegal char :" + e;
		}
	};
	return i;
}, p = function(e) {
	let t = r.MODE_8BIT_BYTE, i = n.stringToBytes(e), a = {};
	return a.getMode = function() {
		return t;
	}, a.getLength = function(e) {
		return i.length;
	}, a.write = function(e) {
		for (let t = 0; t < i.length; t += 1) e.put(i[t], 8);
	}, a;
}, m = function(e) {
	let t = r.MODE_KANJI, i = n.stringToBytes;
	(function(e, t) {
		let n = i(e);
		if (n.length != 2 || (n[0] << 8 | n[1]) != t) throw "sjis not supported.";
	})("友", 38726);
	let a = i(e), o = {};
	return o.getMode = function() {
		return t;
	}, o.getLength = function(e) {
		return ~~(a.length / 2);
	}, o.write = function(e) {
		let t = a, n = 0;
		for (; n + 1 < t.length;) {
			let r = (255 & t[n]) << 8 | 255 & t[n + 1];
			if (33088 <= r && r <= 40956) r -= 33088;
			else if (57408 <= r && r <= 60351) r -= 49472;
			else throw "illegal char at " + (n + 1) + "/" + r;
			r = (r >>> 8 & 255) * 192 + (r & 255), e.put(r, 13), n += 2;
		}
		if (n < t.length) throw "illegal char at " + (n + 1);
	}, o;
}, h = function() {
	let e = [], t = {};
	return t.writeByte = function(t) {
		e.push(t & 255);
	}, t.writeShort = function(e) {
		t.writeByte(e), t.writeByte(e >>> 8);
	}, t.writeBytes = function(e, n, r) {
		n ||= 0, r ||= e.length;
		for (let i = 0; i < r; i += 1) t.writeByte(e[i + n]);
	}, t.writeString = function(e) {
		for (let n = 0; n < e.length; n += 1) t.writeByte(e.charCodeAt(n));
	}, t.toByteArray = function() {
		return e;
	}, t.toString = function() {
		let t = "";
		t += "[";
		for (let n = 0; n < e.length; n += 1) n > 0 && (t += ","), t += e[n];
		return t += "]", t;
	}, t;
}, g = function() {
	let e = 0, t = 0, n = 0, r = "", i = {}, a = function(e) {
		r += String.fromCharCode(o(e & 63));
	}, o = function(e) {
		if (e < 0) throw "n:" + e;
		if (e < 26) return 65 + e;
		if (e < 52) return 97 + (e - 26);
		if (e < 62) return 48 + (e - 52);
		if (e == 62) return 43;
		if (e == 63) return 47;
		throw "n:" + e;
	};
	return i.writeByte = function(r) {
		for (e = e << 8 | r & 255, t += 8, n += 1; t >= 6;) a(e >>> t - 6), t -= 6;
	}, i.flush = function() {
		if (t > 0 && (a(e << 6 - t), e = 0, t = 0), n % 3 != 0) {
			let e = 3 - n % 3;
			for (let t = 0; t < e; t += 1) r += "=";
		}
	}, i.toString = function() {
		return r;
	}, i;
}, _ = function(e) {
	let t = e, n = 0, r = 0, i = 0, a = {};
	a.read = function() {
		for (; i < 8;) {
			if (n >= t.length) {
				if (i == 0) return -1;
				throw "unexpected end of file./" + i;
			}
			let e = t.charAt(n);
			if (n += 1, e == "=") return i = 0, -1;
			e.match(/^\s$/) || (r = r << 6 | o(e.charCodeAt(0)), i += 6);
		}
		let e = r >>> i - 8 & 255;
		return i -= 8, e;
	};
	let o = function(e) {
		if (65 <= e && e <= 90) return e - 65;
		if (97 <= e && e <= 122) return e - 97 + 26;
		if (48 <= e && e <= 57) return e - 48 + 52;
		if (e == 43) return 62;
		if (e == 47) return 63;
		throw "c:" + e;
	};
	return a;
}, v = function(e, t) {
	let n = e, r = t, i = Array(e * t), a = {};
	a.setPixel = function(e, t, r) {
		i[t * n + e] = r;
	}, a.write = function(e) {
		e.writeString("GIF87a"), e.writeShort(n), e.writeShort(r), e.writeByte(128), e.writeByte(0), e.writeByte(0), e.writeByte(0), e.writeByte(0), e.writeByte(0), e.writeByte(255), e.writeByte(255), e.writeByte(255), e.writeString(","), e.writeShort(0), e.writeShort(0), e.writeShort(n), e.writeShort(r), e.writeByte(0);
		let t = s(2);
		e.writeByte(2);
		let i = 0;
		for (; t.length - i > 255;) e.writeByte(255), e.writeBytes(t, i, 255), i += 255;
		e.writeByte(t.length - i), e.writeBytes(t, i, t.length - i), e.writeByte(0), e.writeString(";");
	};
	let o = function(e) {
		let t = e, n = 0, r = 0, i = {};
		return i.write = function(e, i) {
			if (e >>> i) throw "length over";
			for (; n + i >= 8;) t.writeByte(255 & (e << n | r)), i -= 8 - n, e >>>= 8 - n, r = 0, n = 0;
			r = e << n | r, n += i;
		}, i.flush = function() {
			n > 0 && t.writeByte(r);
		}, i;
	}, s = function(e) {
		let t = 1 << e, n = (1 << e) + 1, r = e + 1, a = c();
		for (let e = 0; e < t; e += 1) a.add(String.fromCharCode(e));
		a.add(String.fromCharCode(t)), a.add(String.fromCharCode(n));
		let s = h(), l = o(s);
		l.write(t, r);
		let u = 0, d = String.fromCharCode(i[u]);
		for (u += 1; u < i.length;) {
			let e = String.fromCharCode(i[u]);
			u += 1, a.contains(d + e) ? d += e : (l.write(a.indexOf(d), r), a.size() < 4095 && (a.size() == 1 << r && (r += 1), a.add(d + e)), d = e);
		}
		return l.write(a.indexOf(d), r), l.write(n, r), l.flush(), s.toByteArray();
	}, c = function() {
		let e = {}, t = 0, n = {};
		return n.add = function(r) {
			if (n.contains(r)) throw "dup key:" + r;
			e[r] = t, t += 1;
		}, n.size = function() {
			return t;
		}, n.indexOf = function(t) {
			return e[t];
		}, n.contains = function(t) {
			return e[t] !== void 0;
		}, n;
	};
	return a;
}, y = function(e, t, n) {
	let r = v(e, t);
	for (let i = 0; i < t; i += 1) for (let t = 0; t < e; t += 1) r.setPixel(t, i, n(t, i));
	let i = h();
	r.write(i);
	let a = g(), o = i.toByteArray();
	for (let e = 0; e < o.length; e += 1) a.writeByte(o[e]);
	return a.flush(), "data:image/gif;base64," + a;
};
n.stringToBytes;
//#endregion
//#region src/qr.ts
var b = 4, x = 200;
function S(e) {
	let t = e.trim();
	if (!t) return null;
	let r;
	try {
		if (!/^https?:\/\//i.test(t) || (r = new URL(t), !r.hostname || !["http:", "https:"].includes(r.protocol))) throw Error();
	} catch {
		throw Error("QR destination must be an absolute HTTP or HTTPS URL.");
	}
	let i = r.href;
	if (new TextEncoder().encode(i).length > x) throw Error(`QR destination must be at most ${x} UTF-8 bytes after URL encoding.`);
	let a = n(0, "M");
	a.addData(i, "Byte"), a.make();
	let o = a.getModuleCount();
	return Array.from({ length: o + 8 }, (e, t) => Array.from({ length: o + 8 }, (e, n) => t >= b && t < o + b && n >= b && n < o + b && a.isDark(t - b, n - b)));
}
function C(e, t, n, r, i) {
	let a = S(t);
	if (!a) return;
	if (![
		n,
		r,
		i
	].every(Number.isFinite)) throw Error("QR placement must use finite pixel coordinates.");
	let o = Math.floor(i), s = Math.floor(o / a.length);
	if (s < 1) throw Error("QR square is too small to render all modules.");
	let c = Math.round(n), l = Math.round(r), u = Math.floor((o - s * a.length) / 2);
	e.save();
	try {
		e.globalAlpha = 1, e.globalCompositeOperation = "source-over", e.shadowBlur = 0, e.shadowColor = "transparent", e.filter = "none", e.fillStyle = "#000";
		for (let t = 0; t < a.length; t++) for (let n = 0; n < a.length; n++) a[t][n] && e.fillRect(c + u + n * s, l + u + t * s, s, s);
	} finally {
		e.restore();
	}
}
var w = {
	text: {
		firstName: "CMC",
		lastName: "Seminar",
		roleLabel: "Role:",
		jobTitle: "Attendee",
		eventName: "CMC seminar",
		eventLocation: "Accra",
		badgeNumber: "#0248",
		qrUrl: "https://seminar.cmc-ghana.com/"
	},
	layout: {
		firstName: {
			x: 77,
			y: 279,
			size: 273,
			width: 755
		},
		lastName: {
			x: 74,
			y: 445,
			size: 273,
			width: 758
		},
		roleLabel: {
			x: 89,
			y: 1100,
			size: 30,
			width: 500
		},
		jobTitle: {
			x: 89,
			y: 1150,
			size: 40,
			width: 500
		},
		eventLine: {
			x: 89,
			y: 1200,
			size: 40,
			width: 500
		},
		badgeNumber: {
			x: 833,
			y: 500,
			size: 34,
			width: 414
		},
		qr: {
			x: 700,
			y: 1065,
			size: 167,
			width: 300
		}
	}
}, T = [
	"firstName",
	"lastName",
	"roleLabel",
	"jobTitle",
	"eventLine",
	"badgeNumber",
	"qr"
];
function E() {
	return structuredClone(w.layout);
}
function D(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("Card layout must be an object.");
	let t = e, n = {};
	for (let e of T) {
		if (!Object.hasOwn(t, e)) continue;
		let r = t[e];
		if (!r || typeof r != "object" || Array.isArray(r)) throw TypeError(`Card layout ${e} must be an object.`);
		let i = r, a = {};
		for (let t of [
			"x",
			"y",
			"size",
			"width"
		]) {
			if (!Object.hasOwn(i, t)) continue;
			let n = i[t];
			if (typeof n != "number" || !Number.isFinite(n)) throw TypeError(`Card layout ${e}.${t} must be a finite number.`);
			a[t] = Math.max(t === "size" ? e === "qr" ? 80 : 8 : t === "width" ? 20 : 0, Math.min(t === "y" ? 1320 : t === "size" ? e === "qr" ? 800 : 600 : 900, n));
		}
		n[e] = a;
	}
	return n;
}
function O(e) {
	let t = E();
	for (let n of T) Object.assign(t[n], e[n]);
	return t;
}
//#endregion
//#region src/name-artwork.ts
var k = () => getComputedStyle(document.documentElement).getPropertyValue("--cmc-font-family").trim() || "sans-serif", A, j = "";
function M(e) {
	return Array.from(e.normalize("NFC").replace(/\s+/gu, " ").trim()).slice(0, 120).join("");
}
function N() {
	let e = k();
	return (!A || j !== e) && (j = e, A = new Promise((t, n) => {
		let r = setTimeout(() => n(/* @__PURE__ */ Error("Card font loading timed out.")), 15e3);
		document.fonts.load(`400 16px ${e}`).then((e) => {
			clearTimeout(r), t(e);
		}, (e) => {
			clearTimeout(r), n(e);
		});
	}).catch((e) => {
		throw A = void 0, e;
	})), A;
}
async function P(e) {
	e.throwIfAborted(), await new Promise((t, n) => {
		let r = () => i(e.reason ?? new DOMException("Cancelled", "AbortError"));
		function i(i) {
			e.removeEventListener("abort", r), i ? n(i) : t();
		}
		e.addEventListener("abort", r, { once: !0 }), N().then(() => i(), i);
	}), e.throwIfAborted();
}
function F(e, t) {
	let n = document.createElement("canvas");
	n.width = e, n.height = t;
	let r = n.getContext("2d", { willReadFrequently: !0 });
	if (!r) throw Error("Canvas is unavailable.");
	return {
		canvas: n,
		context: r
	};
}
function I(e, t, n, r, i, a, o, s, c = "normal", l = 400, u = "left") {
	if (!t) return;
	let d = (t) => {
		e.font = `${c} ${l} ${t}px ${k()}`, e.letterSpacing = `${a * t / i}px`;
	};
	e.textAlign = "left", e.textBaseline = "alphabetic", d(i);
	let f = e.measureText(t), p = f.actualBoundingBoxLeft + f.actualBoundingBoxRight;
	p > o && (d(i * o / p), f = e.measureText(t)), e.fillStyle = s;
	let m = u === "right" ? n - f.actualBoundingBoxRight : n + f.actualBoundingBoxLeft;
	return e.fillText(t, m, r), {
		left: m - f.actualBoundingBoxLeft,
		top: r - f.actualBoundingBoxAscent,
		right: m + f.actualBoundingBoxRight,
		bottom: r + f.actualBoundingBoxDescent
	};
}
function L(e, t, n = 0) {
	let r = Math.imul(e + 1, 374761393) ^ Math.imul(t + 1, 668265263) ^ n;
	return r = Math.imul(r ^ r >>> 13, 1274126177), ((r ^ r >>> 16) >>> 0) / 4294967295;
}
function R(e, t) {
	let n = t.filter((e) => !!e);
	if (!n.length) return;
	let r = Math.max(0, Math.floor(Math.min(...n.map((e) => e.left))) - 3), i = Math.max(0, Math.floor(Math.min(...n.map((e) => e.top))) - 3), a = Math.min(e.canvas.width, Math.ceil(Math.max(...n.map((e) => e.right))) + 3), o = Math.min(e.canvas.height, Math.ceil(Math.max(...n.map((e) => e.bottom))) + 3), s = a - r, c = o - i;
	if (s <= 0 || c <= 0) return;
	let l = e.getImageData(r, i, s, c), u = e.createImageData(s, c);
	for (let e = 0; e < c; e++) for (let t = 0; t < s; t++) {
		let n = t + r, a = e + i, o = Math.round((L(n >> 1, a >> 1) - .5) * 3), d = Math.round((L(n >> 1, a >> 1, 941083987) - .5) * 3), f = Math.max(0, Math.min(s - 1, t + o)), p = (Math.max(0, Math.min(c - 1, e + d)) * s + f) * 4, m = (e * s + t) * 4, h = Math.round(L(n, a, 19349663) * 14);
		u.data[m] = Math.min(255, l.data[p] + h), u.data[m + 1] = Math.min(255, l.data[p + 1] + h), u.data[m + 2] = Math.min(255, l.data[p + 2] + h), u.data[m + 3] = l.data[p + 3];
	}
	e.putImageData(u, r, i);
}
async function z(e, t, n, r, i = w.text, a = E()) {
	let o = M(t), s = M(n), c = M(i.roleLabel), l = M(i.jobTitle), u = M(i.eventName), d = M(i.eventLocation), f = M(i.badgeNumber);
	if (await P(r), e.width !== 900 || e.height !== 1320) throw Error("Editable names require the packaged 900 × 1320 artwork.");
	let p = e.getContext("2d");
	if (!p) throw Error("Canvas is unavailable.");
	let m = F(900, 250);
	m.context.drawImage(e, 0, 550, 900, 250, 0, 0, 900, 250);
	let h = (e, t) => {
		for (let n = e; n < e + t; n += 250) {
			let r = Math.min(250, e + t - n);
			p.drawImage(m.canvas, 0, 0, 900, r, 0, n, 900, r);
		}
	};
	h(0, 530), h(925, e.height - 925);
	let g = F(e.width, e.height), _ = a.firstName, v = a.lastName, y = "#1B2D56", b = I(g.context, s, v.x, v.y, v.size, v.size * (-17 / 273), v.width, y), x = I(g.context, o, _.x, _.y, _.size, _.size * (-13.5 / 273), _.width, "#000000");
	R(g.context, [x, b]), r.throwIfAborted(), p.drawImage(g.canvas, 0, 0);
	let S = a.badgeNumber;
	I(p, f, S.x, S.y, S.size, S.size / 34, S.width, "#000000", "normal", 600, "right");
	let T = a.roleLabel, D = a.jobTitle, O = a.eventLine;
	I(p, c, T.x, T.y, T.size, 0, T.width, "#000000", "italic", 600), I(p, l, D.x, D.y, D.size, 0, D.width, "#000000", "normal", 600), I(p, [u, d].filter(Boolean).join(" · "), O.x, O.y, O.size, 0, O.width, "#000000", "normal", 600), C(p, i.qrUrl, a.qr.x, a.qr.y, a.qr.size);
}
//#endregion
//#region src/runtime.ts
function B(e) {
	return new URL(e, import.meta.url).href;
}
var V = t(), H;
function U(e) {
	return V(async () => {
		H ??= import(
			/* @vite-ignore */
			B("./vendor/C41mHjnf.js")
).catch((e) => {
			throw H = void 0, e;
		}), await e(await H);
	});
}
async function W(e, t, n) {
	let r = new URL(e, document.baseURI);
	if (![
		"http:",
		"https:",
		"blob:",
		"data:"
	].includes(r.protocol)) throw Error("Unsupported artwork URL.");
	t.throwIfAborted();
	let i = new Image();
	if (i.crossOrigin = "anonymous", await new Promise((e, n) => {
		let a = setTimeout(() => s(/* @__PURE__ */ Error("Artwork loading timed out.")), 15e3), o = () => s(new DOMException("Cancelled", "AbortError"));
		function s(r) {
			clearTimeout(a), t.removeEventListener("abort", o), i.onload = i.onerror = null, r ? (i.src = "", n(r)) : e();
		}
		i.onload = () => s(), i.onerror = () => s(/* @__PURE__ */ Error("Artwork could not load. Check the URL and image CORS headers.")), t.addEventListener("abort", o, { once: !0 }), i.src = r.href;
	}), t.throwIfAborted(), i.naturalWidth * i.naturalHeight > 32e6) throw Error("Artwork exceeds 32 megapixels.");
	let a = document.createElement("canvas");
	a.width = i.naturalWidth, a.height = i.naturalHeight;
	let o = a.getContext("2d", { willReadFrequently: !0 });
	if (!o) throw Error("Canvas is unavailable.");
	o.drawImage(i, 0, 0), n && await z(a, n.firstName, n.lastName, t, n, n.layout);
	let s = await new Promise((e, t) => {
		try {
			a.toBlob((n) => n ? e(n) : t(/* @__PURE__ */ Error("Artwork could not be decoded.")), "image/png");
		} catch {
			t(/* @__PURE__ */ Error("Artwork needs same-origin access or CORS permission."));
		}
	});
	return t.throwIfAborted(), URL.createObjectURL(s);
}
//#endregion
//#region src/index.ts
var G = "\n  :host{display:block;position:relative;width:100%;height:640px;contain:layout style}\n  .stage{position:relative;width:100%;height:100%;container-type:size;overflow:hidden}\n  canvas{display:block;width:100%;height:100%;touch-action:pan-y;visibility:hidden}\n  canvas:focus-visible{outline:2px solid currentColor;outline-offset:-4px}\n  img{position:absolute;pointer-events:none;user-select:none;top:0;left:calc(50% - 15.6cqh);width:35.2cqh;height:88.4cqh;object-fit:contain}\n  img.custom{top:25%;left:35%;width:30%;height:50%}\n  @media (min-width:1024px){\n    /* Shift the live badge and fallback without changing the entrance animation. */\n    canvas,img{translate:clamp(6rem,12vw,12rem) 0}\n  }\n  @media (max-width:360px) and (max-height:700px){\n    /* Leave room for the introduction and title on compact phone screens. */\n    .stage{transform:scale(.68);transform-origin:top left}\n  }\n  [hidden]{display:none!important}\n  .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}\n  .error{position:absolute;bottom:12px;left:12px;right:12px;text-align:center;font:14px/1.4 var(--cmc-font-family, sans-serif);color:#555}\n", K = class extends HTMLElement {
	static observedAttributes = [
		"artwork",
		"poster",
		"label",
		"paused",
		"first-name",
		"last-name",
		"role-label",
		"job-title",
		"event-name",
		"event-location",
		"badge-number",
		"qr-url"
	];
	#e;
	#t;
	#n;
	#r;
	#i;
	#a = e();
	#o;
	#s = 0;
	#c = 0;
	#l = !1;
	#u;
	#d = "loading";
	#f;
	#p;
	#m = 0;
	#h = Promise.resolve();
	#g;
	#_;
	#v = {};
	constructor() {
		super();
		let e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
		t.textContent = G, this.#e = document.createElement("div"), this.#e.className = "stage", this.#t = document.createElement("img"), this.#t.hidden = !0, this.#t.alt = "", this.#t.onerror = () => {
			let e = this.#w();
			if (this.#t.src === e) {
				this.#t.hidden = !0;
				return;
			}
			this.#t.classList.add("custom"), this.#t.src = e;
		}, this.#n = document.createElement("p"), this.#n.className = "sr", this.#n.setAttribute("role", "status");
		let n = document.createElement("span");
		n.className = "sr", n.id = "card-help", n.textContent = "Drag to move. Enter or arrow keys to nudge. Space to pause. R to reset.", this.#e.append(this.#t, this.#n, n), e.append(t, this.#e);
	}
	get state() {
		return this.#d;
	}
	get firstName() {
		return this.getAttribute("first-name") ?? w.text.firstName;
	}
	set firstName(e) {
		this.setAttribute("first-name", e);
	}
	get lastName() {
		return this.getAttribute("last-name") ?? w.text.lastName;
	}
	set lastName(e) {
		this.setAttribute("last-name", e);
	}
	get roleLabel() {
		return this.getAttribute("role-label") ?? w.text.roleLabel;
	}
	set roleLabel(e) {
		this.setAttribute("role-label", e);
	}
	get jobTitle() {
		return this.getAttribute("job-title") ?? w.text.jobTitle;
	}
	set jobTitle(e) {
		this.setAttribute("job-title", e);
	}
	get eventName() {
		return this.getAttribute("event-name") ?? w.text.eventName;
	}
	set eventName(e) {
		this.setAttribute("event-name", e);
	}
	get eventLocation() {
		return this.getAttribute("event-location") ?? w.text.eventLocation;
	}
	set eventLocation(e) {
		this.setAttribute("event-location", e);
	}
	get badgeNumber() {
		return this.getAttribute("badge-number") ?? w.text.badgeNumber;
	}
	set badgeNumber(e) {
		this.setAttribute("badge-number", e);
	}
	get qrUrl() {
		return this.getAttribute("qr-url") ?? w.text.qrUrl;
	}
	set qrUrl(e) {
		this.setAttribute("qr-url", e);
	}
	get layout() {
		return O(this.#v);
	}
	set layout(e) {
		let t = D(e);
		JSON.stringify(t) !== JSON.stringify(this.#v) && (this.#v = t, this.isConnected && !this.getAttribute("artwork") && (this.#i ? this.#k() : this.#j()));
	}
	connectedCallback() {
		this.#f = matchMedia("(prefers-reduced-motion: reduce)"), this.#f.addEventListener("change", this.#y), this.#j();
	}
	disconnectedCallback() {
		this.#f?.removeEventListener("change", this.#y), this.#A();
	}
	attributeChangedCallback(e, t, n) {
		t !== n && this.isConnected && (e === "paused" ? (this.#p = n !== null, this.#y()) : e === "label" || e === "poster" ? this.#T() : [
			"first-name",
			"last-name",
			"role-label",
			"job-title",
			"event-name",
			"event-location",
			"badge-number",
			"qr-url"
		].includes(e) ? (this.#T(), this.getAttribute("artwork") || (this.#i ? this.#k() : this.#j())) : this.#j());
	}
	nudge() {
		this.#l && this.#i?.nudge();
	}
	reset() {
		this.#l && (this.#b(), this.#i?.reset());
	}
	setPaused(e) {
		this.#p = e;
		let t = this.hasAttribute("paused") === e;
		this.toggleAttribute("paused", e), t && this.#y();
	}
	#y = () => {
		this.#a.paused = !this.#l || this.hasAttribute("paused") || (this.#p ?? !!this.#f?.matches), this.#i?.setPaused(this.#a.paused), (this.#a.paused || this.#f?.matches) && this.#b();
	};
	#b() {
		this.#u?.cancel(), this.#u = void 0;
	}
	#x(e) {
		if (this.#a.paused || this.#f?.matches) return;
		let t = this.#u = e.animate([
			{
				transform: "translateY(-100%)",
				offset: 0,
				easing: "cubic-bezier(.55,0,1,.45)"
			},
			{
				transform: "translateY(1.6%)",
				offset: .72,
				easing: "ease-out"
			},
			{
				transform: "translateY(-.65%)",
				offset: .87,
				easing: "ease-in-out"
			},
			{
				transform: "translateY(0)",
				offset: 1
			}
		], { duration: 900 });
		t.onfinish = () => {
			this.#u === t && (this.#u = void 0);
		};
	}
	#S(e, t) {
		this.dispatchEvent(new CustomEvent(e, {
			detail: t,
			bubbles: !0,
			composed: !0
		}));
	}
	#C(e) {
		this.#d = e, this.dataset.state = e, this.#S("card-statechange", { state: e });
	}
	#w() {
		return B("./assets/card-placeholder.svg");
	}
	#T() {
		let e = this.getAttribute("artwork");
		this.#t.src = this.getAttribute("poster") || e || this.#g || this.#w(), this.#t.classList.toggle("custom", !this.getAttribute("poster"));
		let t = [
			[this.roleLabel, this.jobTitle].filter(Boolean).join(" "),
			this.eventName,
			this.eventLocation,
			this.badgeNumber ? `Badge ${this.badgeNumber}` : ""
		].filter(Boolean).join(". "), n = e ? "" : `: ${this.firstName} ${this.lastName}${t ? ". " + t : ""}`;
		this.#t.alt = this.getAttribute("label") || `Hanging card${n}`, this.#r?.setAttribute("aria-label", this.getAttribute("label") || `Interactive hanging card${n}`);
	}
	#E() {
		return {
			firstName: this.firstName,
			lastName: this.lastName,
			roleLabel: this.roleLabel,
			jobTitle: this.jobTitle,
			eventName: this.eventName,
			eventLocation: this.eventLocation,
			badgeNumber: this.badgeNumber,
			qrUrl: this.qrUrl
		};
	}
	#D(e, t) {
		let n = this.getAttribute("artwork");
		return W(n || B("./assets/badge_nofilter.webp"), e, n ? void 0 : {
			...t,
			layout: this.layout
		});
	}
	#O(e) {
		this.#g && URL.revokeObjectURL(this.#g), this.#g = e, this.#T();
	}
	#k() {
		let e = ++this.#m, t = this.#s, n = this.#i, r = this.#o.signal, i = () => this.isConnected && t === this.#s && e === this.#m;
		this.#h = this.#h.then(async () => {
			if (!i()) return;
			let e = this.#E(), t;
			try {
				if (t = await this.#D(r, e), !i() || (await n.setCard(t), !i())) return;
				this.#O(t), t = void 0, this.#n.className = "sr", this.#n.textContent = "";
				let a = e.firstName !== this.#_?.firstName || e.lastName !== this.#_?.lastName;
				this.#_ = e, a && this.#S("card-namechange", {
					firstName: e.firstName,
					lastName: e.lastName
				}), this.#S("card-textchange", { ...e });
			} catch (e) {
				if (!i() || r.aborted) return;
				this.#n.className = "error", this.#n.textContent = "The card text could not update. Please try again.", this.#S("card-error", { message: e instanceof Error ? e.message : String(e) });
			} finally {
				t && URL.revokeObjectURL(t);
			}
		});
	}
	#A() {
		++this.#s, this.#l = !1, this.#b(), this.#o?.abort(), cancelAnimationFrame(this.#c), this.#i?.dispose(), this.#h = Promise.resolve(), this.#i = void 0, this.#_ = void 0, this.#g && URL.revokeObjectURL(this.#g), this.#g = void 0, this.#r?.remove(), this.#r = void 0;
	}
	async #j() {
		this.#A();
		let t = this.#s, n = () => this.isConnected && t === this.#s, r = this.#o = new AbortController();
		this.#a = e(), this.#y();
		let i = this.#a, a = this.#r = document.createElement("canvas");
		a.tabIndex = 0, a.setAttribute("role", "img"), a.setAttribute("aria-describedby", "card-help"), a.addEventListener("keydown", (e) => {
			[
				"Enter",
				"ArrowLeft",
				"ArrowRight",
				"ArrowUp",
				"ArrowDown"
			].includes(e.key) ? (e.preventDefault(), this.nudge()) : e.key === " " ? (e.preventDefault(), this.setPaused(!i.paused)) : e.key.toLowerCase() === "r" && this.reset();
		}), this.#e.prepend(a), this.#t.hidden = !0, this.#n.className = "sr", this.#n.textContent = "Loading interactive card.", this.#T(), this.#C("loading");
		let o;
		try {
			let e = this.#E();
			if (o = await this.#D(r.signal, e), !n() || (this.getAttribute("poster") || (this.#t.src = o, this.#t.classList.add("custom")), await U(async (t) => {
				if (!n()) return;
				let r = await t.createBadgeScene(a, () => i, (e) => {
					n() && this.#l && this.#C(e);
				}, o);
				if (!n()) {
					r.dispose();
					return;
				}
				this.#i = r, this.#_ = e, this.#O(o), o = void 0, r.setPaused(i.paused);
			}), !n())) return;
			await this.#i.ready;
			let t;
			do
				t = this.#h, await t;
			while (n() && t !== this.#h);
			if (!n()) return;
			this.#c = requestAnimationFrame(() => {
				if (!n() || (this.#l = !0, this.#y(), !n())) return;
				let e = i.paused ? "paused" : "live";
				this.#d !== e && this.#C(e), n() && (this.#x(a), a.style.visibility = "visible", this.#t.hidden = !0, this.#n.textContent = "", this.#S("card-ready", { state: this.#d }));
			});
		} catch (e) {
			if (!n() || r.signal.aborted) return;
			this.#i?.dispose(), this.#i = void 0, o &&= (this.#O(o), void 0), this.#t.hidden = !1, this.#n.className = "error", this.#n.textContent = "Interactive card unavailable. Showing the still image.", this.#C("error"), this.#S("card-error", { message: e instanceof Error ? e.message : String(e) });
		} finally {
			o && URL.revokeObjectURL(o);
		}
	}
};
customElements.get("hanging-card") || customElements.define("hanging-card", K);
//#endregion
export { K as HangingCard, E as getDefaultCardLayout };
