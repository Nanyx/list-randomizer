class ListRandomizer {

  isRerollSame = false;
  reRollJoin = ", ";

  /**
   * Creates an instance of ListRandomizer.
   * @param {Object} options - Options of the randomizer
   * @param {boolean} [options.isRerollSame=false] - In case of a number in a list, allow to re-roll the same value
   * @param {String} [options.reRollJoin=", "] - In case of a number in a list, allow to re-roll the same value
   * @param {...String[] | ...Array.<String[]>} lists - Multiple list, a roll will be done on each one
   * @memberof ListRandomizer
   */
  constructor(options, ...lists){
    this.lstMain = lists;
    options = options || {};
    this.isRerollSame = options.isRerollSame || this.isRerollSame;
    this.reRollJoin = options.reRollJoin || this.reRollJoin;
  }

  /**
   * Generate a list from the ones feeded.
   * @memberof ListRandomizer
   */
  rnd = () => {
    return this.lstMain
      .map(item => this._getRandom(item))
      .filter(item => item !== null && item.length !== 0);
  }

  /**
   * @param {string | string[]} item
   * @memberof ListRandomizer
   */
  _getRandom = (item) => {    
    if(typeof(item) === "string") return item;
    if(Array.isArray(item)) return this._getItemFromArray(item.slice());
    return null;
  }

  /**
   * Get the value in a list at random. Number imply re-rolling on the table.
   * @private
   * @param {String[]} arr
   * @memberof ListRandomizer
   */
  _getItemFromArray = (arr) => {
    let index = this._getRandomIndex(arr.length);
    let val = arr[index];
    if(!this.isRerollSame) arr.splice(index, 1);
    switch(typeof(val)){
      case "string": return val;
      case "number": return this._getReroll(arr.filter(item => typeof(item) === "string"), val)
        .filter(item => item !== null)
        .join(this.reRollJoin);
      default: return null;
    }
  }

  /**
   * @param {number} length
   * @memberof ListRandomizer
   */
  _getRandomIndex = (length) => {
    return Math.floor(Math.random() * length);
  }

  /**
   * @param {string[]} arr
   * @param {number} time
   * @returns {String[]}
   * @memberof ListRandomizer
   */
  _getReroll = (arr, time) => {
    let reRollArr = [];
    for(let i = 0; i < time; i++){
      reRollArr.push(this._getItemFromArray(arr));
    }
    return reRollArr;
  }

}

module.exports = ListRandomizer;