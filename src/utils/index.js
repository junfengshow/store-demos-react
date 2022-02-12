
export const getUserList = (params) => {
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['zhangsan', 'lisi'])
    }, 200)
  })
}
