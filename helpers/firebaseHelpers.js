export const snapshotToArray = (snapshot) => {
  let returnArr = [];
  snapshot.forEach((childSnap) => {
    let item = childSnap.val();
    item.key = childSnap.key;
    returnArr.push(item);
  });

  return returnArr;
};
