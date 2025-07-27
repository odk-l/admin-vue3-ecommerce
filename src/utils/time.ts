//封装一个函数:获取一个结果:早上下午还是晚上
export const getTime = () => {
    let message: string = ''
    let hour = new Date().getHours()
    if (hour <= 9) {
        return message = '早上'
    } else if (hour <= 12) {
        return message = '上午'
    } else if (hour <= 18) {
        return message = '下午'
    } else {
        return message = '晚上'
    }
}