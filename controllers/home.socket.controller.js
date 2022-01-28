const userIsLogin = require('../stores/UserLoginStore');
const friend = require('../models/friend.model');
const chat = require('../models/chat.model');
const detailGroup = require('../models/detailGroup.model');

module.exports.login = async (data, socket, io) => {
    try {
        //luu thong tin vua dang nhap vao arr
        const userId = data.userId;
        const result = await userIsLogin.store(userId, socket);

        if (!result) {
            //neu that bai thong bao cho nguoi dung that bai
            socket.emit('error', { message: 'login error' })
        }

        //chuyen tat ca trang thai tin nhan thanh da nhan
        const listGroupChat = await detailGroup.getGroups(userId, 10000, 0);
        let groupChatArr = [];
        if (listGroupChat) {
            for (let i = 0; i < listGroupChat.length; i++) {
                groupChatArr.push(listGroupChat[i].groupId);
            }
            const status = 'Đã nhận';
            await chat.updateStatus(status, groupChatArr);
        }

        //lay danh sach ban be
        const listFriend = await friend.listFriend(userId, 10000, 0);

        if (listFriend) {
            //thong bao den tat ca nguoi dung trong danh sach ban minh vua dang nhap
            listFriend.forEach(async (Element) => {
                let receiveId;
                //tim ban
                receiveId = (Element.sendId == userId) ? Element.receiveId : Element.sendId;

                //kiem tra co online khong
                const userSocket = (await userIsLogin.getUserSocket(receiveId));

                if (userSocket) {
                    //gui thong bao
                    io.to(`${userSocket.id}`).emit('user-login', { userId: userId });
                }
            });
        }
    } catch (err) {
        socket.emit('user-login-error', {msg: 'socket đăng nhập không thành công'});
        console.error(err);
    }
}

module.exports.logout = async (data, socket, io) => {
    try {
        //xoa thong tin vua dang nhap vao arr
        const userId = data.userId;
        const result = await userIsLogin.remove(userId);

        if (!result) {
            //neu that bai thong bao cho nguoi dung that bai
            socket.emit('error', { message: 'logout error' })
        }

        //lay danh sach ban be
        const listFriend = await friend.listFriend(userId, 10000, 0);

        if (listFriend) {
            //thong bao den tat ca nguoi dung trong danh sach ban minh vua dang xuat
            listFriend.forEach(async (Element) => {
                let receiveId;
                //tim ban
                receiveId = (Element.sendId == userId) ? Element.receiveId : Element.sendId;

                //kiem tra co online khong
                const userSocket = (await userIsLogin.getUserSocket(receiveId));

                if (userSocket) {
                    //thong bao den tat ca nguoi dung minh vua dang xuat
                    io.to(`${userSocket.id}`).emit('logout', { userId: userId });
                }
            });
        }
    } catch (err) {
        console.error(err);
    }
}