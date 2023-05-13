import io from 'socket.io-client'
const socket = io.connect('http://ec2-13-211-103-172.ap-southeast-2.compute.amazonaws.com:8888')


export default socket