import {isSortValid, InvalidSortObjectWarning} from './index';
describe(__filename, () => {

  it('should return false when sort string is invalid', () =>{
    const notValid = "id:desc,ageasc:";
    const notValid2 = "created_at:asc,,id:desc";
    const notValid3 = "";
    const notValid4 = "created_at:asc,id:desc,";
    expect(isSortValid(notValid)).toBe(false);
    expect(isSortValid(notValid2)).toBe(false);
    expect(isSortValid(notValid3)).toBe(false);
    expect(isSortValid(notValid4)).toBe(false);
  });

  it('should return true when sort string is valid', () =>{
    const valid = "id:desc";
    const valid2 = "created_at:asc,id:desc";
    expect(isSortValid(valid)).toBe(true);
    expect(isSortValid(valid2)).toBe(true);
  });

});