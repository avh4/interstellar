var NumberFormatter = require('../../public/src/number_formatter');

describe('NumberFormatter', function() {
  it('should append the units', function() {
    expect(NumberFormatter.format(1, 0, 1, "g")).toBe("1 g");
  });

  it('should honor significant figures', function() {
    expect(NumberFormatter.format(1, 0, 3, "g")).toBe("1.00 g");
  });

  it('should apply prefixes', function() {
    expect(NumberFormatter.format(1,  3, 1, "g")).toBe("1 kg");
    expect(NumberFormatter.format(1,  6, 1, "g")).toBe("1 Mg");
    expect(NumberFormatter.format(1,  9, 1, "g")).toBe("1 Gg");
    expect(NumberFormatter.format(1, 12, 1, "g")).toBe("1 Tg");
    expect(NumberFormatter.format(1, 15, 1, "g")).toBe("1 Pg");
    expect(NumberFormatter.format(1, 18, 1, "g")).toBe("1 Eg");
    expect(NumberFormatter.format(1, 21, 1, "g")).toBe("1 Zg");
    expect(NumberFormatter.format(1, 24, 1, "g")).toBe("1 Yg");
  });

  it('should apply double prefixes', function() {
    expect(NumberFormatter.format(1, 27, 1, "g")).toBe("1 kYg");
    expect(NumberFormatter.format(1, 30, 1, "g")).toBe("1 MYg");
    expect(NumberFormatter.format(1, 33, 1, "g")).toBe("1 GYg");
    expect(NumberFormatter.format(1, 36, 1, "g")).toBe("1 TYg");
    expect(NumberFormatter.format(1, 39, 1, "g")).toBe("1 PYg");
    expect(NumberFormatter.format(1, 42, 1, "g")).toBe("1 EYg");
    expect(NumberFormatter.format(1, 45, 1, "g")).toBe("1 ZYg");
    expect(NumberFormatter.format(1, 48, 1, "g")).toBe("1 YYg");
  });

  it('should apply non-prefix exponents', function() {
    expect(NumberFormatter.format(1, 1, 1, "g")).toBe("10 g");
  });

  it('should normalize the exponent for small values', function() {
    expect(NumberFormatter.format(0.001, 12, 1, "g")).toBe("1 Gg");
  });

  it('should normalize the exponent for large values', function() {
    expect(NumberFormatter.format(2500, 12, 2, "g")).toBe("2.5 Pg");
    expect(NumberFormatter.format(20000, 12, 1, "g")).toBe("20 Pg");
    expect(NumberFormatter.format(200000, 12, 1, "g")).toBe("200 Pg");
    expect(NumberFormatter.format(2000000, 12, 1, "g")).toBe("2 Eg");
  });

  it('should use correct significant figures for large values', function() {
    expect(NumberFormatter.format(2500, 12, 2, "g")).toBe("2.5 Pg");
    expect(NumberFormatter.format(25000, 12, 2, "g")).toBe("25 Pg");
    expect(NumberFormatter.format(250000, 12, 2, "g")).toBe("250 Pg");
    expect(NumberFormatter.format(2500000, 12, 2, "g")).toBe("2.5 Eg");
  });

  it('should round to signifcant figures for hundreds values', function() {
    expect(NumberFormatter.format(543, 0, 3, "g")).toBe("543 g");
    expect(NumberFormatter.format(543, 0, 2, "g")).toBe("540 g");
    expect(NumberFormatter.format(543, 0, 1, "g")).toBe("500 g");
  });

  it('should round to signifcant figures for tens values', function() {
    expect(NumberFormatter.format(5.4, 1, 3, "g")).toBe("54.0 g");
    expect(NumberFormatter.format(5.4, 1, 2, "g")).toBe("54 g");
    expect(NumberFormatter.format(5.4, 1, 1, "g")).toBe("50 g");
  });

  it('should normalize exponent for odd exponents', function() {
    expect(NumberFormatter.format(77.13471, 26, 3, "W")).toBe("7.71 kYW");
    expect(NumberFormatter.format(0.001947, 26, 3, "W")).toBe("195 ZW");
  });

  it('should work for zero', function() {
    expect(NumberFormatter.format(0, 0, 1, "g")).toBe("0 g");
    expect(NumberFormatter.format(0, 0, 2, "g")).toBe("0.0 g");
  });

  it('should use reference scale for zero', function() {
    expect(NumberFormatter.format(0, 6, 1, "g")).toBe("0 Mg");
    expect(NumberFormatter.format(0, 6, 2, "g")).toBe("0.0 Mg");
  })
});