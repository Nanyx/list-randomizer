const ListRand = require('../index');

describe("class default", () => {
  let lstRnd = new ListRand();

  test('Object Constructor', () => {
    expect(lstRnd).not.toBe(null);
  });

  test('options values', () => {
    expect(lstRnd.isRerollSame).toBe(false);
    expect(lstRnd.reRollJoin).toBe(", ");
  });

});

describe("class custom options", () => {
  const join = " and ";
  let lstRnd = new ListRand({isRerollSame:true, reRollJoin:join});

  test('Object Constructor', () => {
    expect(lstRnd).not.toBe(null);
  });

  test('options values', () => {
    expect(lstRnd.isRerollSame).toBe(true);
    expect(lstRnd.reRollJoin).toBe(join);
  });

});

describe("func rnd", () => {
  const arrParm1 = ["test 1", "test 2"];
  const arrParm2 = ["param 1", "param 2"];
  const arrReroll = [20, "test"];
  const str = "string";

  test("single string", () => {
    let lstRnd = new ListRand(null, str);
    expect(lstRnd.rnd()[0]).toBe(str);
  });

  test("null value", () => {
    let lstRnd = new ListRand();
    expect(lstRnd.rnd()).toStrictEqual([]);
  });

  test("single array", () => {
    let lstRnd = new ListRand(null, arrParm1);
    expect(arrParm1.includes(lstRnd.rnd()[0])).toBeTruthy();
  });

  test("single mixed up", () => {
    let lstRnd = new ListRand(null, arrParm1, str, arrParm2);
    let val = lstRnd.rnd();
    expect(val.length).toBe(3);
    expect(arrParm1.includes(val[0])).toBeTruthy();
    expect(val[1]).toBe(str);
    expect(arrParm2.includes(val[2])).toBeTruthy();
  });

  test("invalid type", () => {
    let lstRnd = new ListRand(null, undefined, null, () => {}, true);
    expect(lstRnd.rnd()).toStrictEqual([]);
  });

  test("re-roll no valid value", () => {
    let lstRnd = new ListRand(null, [2]);
    expect(lstRnd.rnd()).toEqual([]);
  });

  test("re-roll valid value", () => {
    let lstRnd = new ListRand(null, arrReroll);
    expect(lstRnd.rnd()).toEqual(["test"]);
  });

});