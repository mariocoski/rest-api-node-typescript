export default (sortString: string, pickableAttributes: string[] = []): string[][] => {
  return sortString.toLowerCase().split(',').reduce((prev: any, curr: any)=>{
    const [key, value] = curr.split(':');
<<<<<<< HEAD
    const item = [[key,value]];
    if(pickableAttributes.length){
      return pickableAttributes.indexOf(key) !== -1 ? [...prev,...item] : prev;
    }
    return [...prev,...item];
=======
    if (pickableAttributes.indexOf(key) !== -1) {
      return [...prev, [key, value]];
    }
    return prev;
>>>>>>> a615685a70cf6f8d292211f9a095a2ed15989c03
  },[]);
}
