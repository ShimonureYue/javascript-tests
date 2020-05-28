const arrayUnique = array => {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i] === a[j])
              a.splice(j--, 1);
      }
  }

  return a;
}
const rules = {
  ROOT: ['all:all:all'],
  ADMIN: ['dashboard:draft:all', 'dashboard:active:edit', 'all:all:delete'],
  USER: ['dashboard:active:edit', 'dashboard:active:delete', 'dashboard:active:clone']
}

const hasPermission = (ruleList, roles, actions) => {
  let permissionList = [];
  for (let rule in ruleList){
    if(roles.includes(rule)) {
      permissionList = [ ...permissionList, ... ruleList[rule]];
    }
  }
  const permissions = arrayUnique(permissionList);

  if (permissions.length <= 0){
    return false;
  }
  
  // console.log('Permissions:', permissions);
  // console.log('Actions:', actions);
  
  const splitPermissions = permissions.map(permission => permission.split(':'));
  const splitActions = actions.map(action => action.split(':'));

  for (let action in splitActions) {
    for (let permission in splitPermissions) {
      // console.log(splitPermissions[permission].length, splitActions[action].length);
      
      if(splitPermissions[permission].length !== 3 || splitActions[action].length !== 3) {
        return false;
      }
      const check1 =  (splitPermissions[permission][0] === 'all' || splitActions[action][0] === splitPermissions[permission][0]);
      const check2 =  (splitPermissions[permission][1] === 'all' || splitActions[action][1] === splitPermissions[permission][1]);
      const check3 =  (splitPermissions[permission][2] === 'all' || splitActions[action][2] === splitPermissions[permission][2]);
      
      // console.log(`CHECK: ${splitActions[action].toString()} | ${splitPermissions[permission]} => ${check1 && check2 && check3}`);
      if (check1 && check2 && check3){
        return true;
      }
        
      
    }
  }

  // console.log('splitPermission', splitPermissions);
  // console.log('splitActions', splitActions);
  
  // return permissions.some( permission => {
  //   const regexPermission = /^([a-zA-Z]+|\ball\b):([a-zA-Z]+|\ball\b):([a-zA-Z]+|\ball\b)$/;
  //   const filterActions = actions.filter(a => regexPermission.test(a));

   
  //   const splitActions = actions.split(':')
  //   console.log('filterActions:', filterActions);
  
  //   return filterActions.includes(item);
  // });
  return false;
};


const check = hasPermission(rules,['ADMIN'], [ 'dashboard:active','dashboard:inReview:delete', 'dashboard:inactive:clone',]);

console.log('HAS_PERMISSION', check);
