const User = require('./model/user')

class FakeDb {

    constructor() {
        this.users = [
            {
              username: 'テスト1',
              email: 'test1@gmail.com',
              password: 123456,
              authority: '管理者  ',
              },
              {
                username: 'テスト2',
                email: 'test2@gmail.com',
                password: 123456,
                authority: '一般  ',
                },
                {
                  username: 'テスト3',
                  email: 'test3@gmail.com',
                  password: 123456,
                  authority: '一般  ',
                  },
        ]
    }

    async initDb() {
      await this.cleanDb()
      this.pushUsersToDb()
    }

    async cleanDb() {
      await User.deleteMany({})
    }
    
    pushUsersToDb() {
        this.users.forEach(
            (user) => {
                const newUser = new User(user)
                newUser.save()
            }
        )
    }

    seeDb() {
        this.pushUsersToDb()
    }
}

module.exports = FakeDb