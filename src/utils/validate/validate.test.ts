import {isSortValid, InvalidSortObjectWarning} from './index';
describe(__filename, () => {

  it('should return false when sort string is invalid', () =>{
    const notValid = "id:desc,ageasc:";
    const notValid2 = "";
    expect(isSortValid(notValid)).toBe(false);
    expect(isSortValid(notValid2)).toBe(false);
  });

});