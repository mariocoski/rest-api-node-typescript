import createOrderObject from './createOrderObject';

describe(__filename, () => {
  it('should transform valid sort string to valid order object', () =>{
    const validSortString = "created_at:asc,id:desc";
    expect(createOrderObject(validSortString)).toEqual([['created_at','asc'],['id','desc']]);
  });
});