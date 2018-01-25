export default (sortString: string, pickableAttributes: string[] = []): string[][] => {
  return sortString.toLowerCase().split(',').reduce((prev: any, curr: any)=>{
    const [key, value] = curr.split(':');
    const item = pickableAttributes.length ? (pickableAttributes.indexOf(key) !== -1 ? [[key, value]]: [] ): [[key, value]] ; 
    return prev.concat(item);
  },[]);
}