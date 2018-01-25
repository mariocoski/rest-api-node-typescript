import createOrderObject from './createOrderObject';

describe(__filename, () => {
  it('should transform valid sort string to valid order object', () =>{
    const validSortString = "created_at:asc,id:desc,another_field:asc";
    expect(createOrderObject(validSortString)).toEqual([
      ['created_at','asc'],['id','desc'], ['another_field','asc']
    ]);
  });

  it('should transform valid sort string to valid order object only for provided attributes', () =>{
    const validSortString = "created_at:asc,id:desc,another_field:asc";
    expect(createOrderObject(validSortString, ['created_at','id'])).toEqual([
      ['created_at','asc'],['id','desc']
    ]);
  });
});
