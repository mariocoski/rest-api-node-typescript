export default (sortString: string, pickableAttributes: string[] = []): string[][] => {
  return sortString.toLowerCase().split(',').reduce((prev: any, curr: any)=>{
    const [key, value] = curr.split(':');
    const item = [[key,value]];
    if(pickableAttributes.length){
      return pickableAttributes.indexOf(key) !== -1 ? [...prev,...item] : prev;
    }
    return [...prev,...item];
  },[]);
}
