export default (sortString: string, pickableAttributes: string[] = []): string[][] => {
  return sortString.toLowerCase().split(',').reduce((prev: any, curr: any)=>{
    const [key, value] = curr.split(':');
    if (pickableAttributes.indexOf(key) !== -1) {
      return [...prev, [key, value]];
    }
    return prev;
  },[]);
}
