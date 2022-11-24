<template>
    <view class="register-box">
        <view class="register-head"><u-icon name="account" size="100px"></u-icon></view>
        <view class="register-msg">
            <u-row customStyle="margin-bottom: 10px" justify="space-between">
                <u-col span="2"><text>姓名</text></u-col>
                <u-col span="10">
                    <view class="input">
                        <u--input
                            @input="checking($event, 'name')"
                            placeholder="请输入名称"
                            border="bottom"
                            v-model="user.userName"
                        ></u--input>
                        <u-icon
                            :name="inputVerifyStyleList.name[0]"
                            :color="inputVerifyStyleList.name[1]"
                            v-if="user.userName !== ''"
                        ></u-icon>
                    </view>
                </u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10px" justify="space-between">
                <u-col span="2"><text>手机</text></u-col>
                <u-col span="10">
                    <view class="input">
                        <u--input
                            @input="checking($event, 'phone')"
                            placeholder="请输入手机号"
                            border="bottom"
                            v-model="user.userPhone"
                        ></u--input>
                        <u-icon
                            :name="inputVerifyStyleList.phone[0]"
                            :color="inputVerifyStyleList.phone[1]"
                            v-if="user.userPhone !== ''"
                        ></u-icon>
                    </view>
                </u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10px" justify="space-between">
                <u-col span="2"><text>邮箱</text></u-col>
                <u-col span="10">
                    <view class="input">
                        <u--input
                            @input="checking($event, 'Email')"
                            placeholder="请输入邮箱"
                            border="bottom"
                            v-model="user.userEmail"
                        ></u--input>
                        <u-icon
                            :name="inputVerifyStyleList.email[0]"
                            :color="inputVerifyStyleList.email[1]"
                            v-if="user.userEmail !== ''"
                        ></u-icon>
                    </view>
                </u-col>
            </u-row>
            <u-row customStyle="margin-bottom: 10px" justify="space-between">
                <u-col span="2"><text>密码</text></u-col>
                <u-col span="10">
                    <view class="input">
                        <u--input
                            @input="checking($event, 'password')"
                            border="bottom"
                            v-model="user.userPassword"
                            password
                        ></u--input>
                        <u-icon
                            :name="inputVerifyStyleList.password[0]"
                            :color="inputVerifyStyleList.password[1]"
                            v-if="user.userPassword !== ''"
                        ></u-icon>
                    </view>
                </u-col>
            </u-row>
            <u-alert title="注意 :" type="warning" closable="true" :description="description" fontSize="16"></u-alert>
        </view>
        <view class="register-button"><u-button text="注册" @click="register" color="#71d5a1"></u-button></view>
    </view>
</template>

<script>
import {isEmail, isPhone} from '@/util/validate.js';
import {userRegister} from '@/util/api.js';
export default {
    data() {
        return {
            description: '1. 姓名填写不能为空\t\n 2. 密码必须长度必须大于6位\t\n 3. 邮箱可以进行找回密码',
            user: {
                userName: '',
                userPhone: '',
                userPassword: '',
                userEmail: ''
            },
            inputVerifyStyleList: {
                name: [],
                phone: [],
                email: [],
                password: []
            },
            succee: {
                name: 'checkmark-circle',
                color: '#5ac725'
            },
            fail: {
                name: 'close-circle',
                color: '#f56c6c'
            }
        };
    },
    methods: {
        // 验证
        checking(...parents) {
            let obj = this.inputVerifyStyleList;
            if (parents[1] === 'name') {
                if (parents[0] === null || parents[0].trim() === '') {
                    obj.name[0] = this.fail.name;
                    obj.name[1] = this.fail.color;
                    obj.name[2] = false;
                } else {
                    obj.name[0] = this.succee.name;
                    obj.name[1] = this.succee.color;
                    obj.name[2] = true;
                }
                return;
            }
            if (parents[1] === 'phone') {
                if (isPhone(parents[0])) {
                    obj.phone[0] = this.succee.name;
                    obj.phone[1] = this.succee.color;
                    obj.phone[2] = true;
                } else {
                    obj.phone[0] = this.fail.name;
                    obj.phone[1] = this.fail.color;
                    obj.phone[2] = false;
                }
                return;
            }
            if (parents[1] === 'password') {
                if (parents[0] === null || parents[0].trim() === '' || parents[0].length < 6) {
                    obj.password[0] = this.fail.name;
                    obj.password[1] = this.fail.color;
                    obj.password[2] = false;
                } else {
                    obj.password[0] = this.succee.name;
                    obj.password[1] = this.succee.color;
                    obj.password[2] = true;
                }
                return;
            }
            if (parents[1] === 'Email') {
                if (isEmail(parents[0])) {
                    obj.email[0] = this.succee.name;
                    obj.email[1] = this.succee.color;
                    obj.email[2] = true;
                } else {
                    obj.email[0] = this.fail.name;
                    obj.email[1] = this.fail.color;
                    obj.email[2] = false;
                }
            }
        },
        async register() {
            if (!this.verifyData()) return;
            let res = await userRegister(this.user);
            if (res.userId > 0) {
                uni.$showMsg('注册成功');
                setTimeout(() => {
                    uni.redirectTo({
                        url: '../../subpkg/login/login'
                    });
                }, 1000);
            }
        },
        verifyData() {
            if (
                this.inputVerifyStyleList.name[2] &&
                this.inputVerifyStyleList.phone[2] &&
                this.inputVerifyStyleList.password[2] &&
                this.inputVerifyStyleList.email[2]
            ) {
                return true;
            }
            uni.$showMsg('信息有误重新填写');
            return false;
        }
    }
};
</script>

<style lang="scss">
.register-box {
    margin-top: 120rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .register-head {
        width: 200rpx;
        height: 200rpx;
        border: 1px solid $u-info-dark;
        border-radius: 50%;
        margin-bottom: 40rpx;
    }

    .register-msg {
        width: 666rpx;
        padding: 20rpx;

        .input {
            display: flex;
            justify-content: start;
            align-items: flex-end;
            margin-right: 20rpx;
        }
    }

    .register-button {
        margin: 40rpx;
        width: 642rpx;
        position: fixed;
        bottom: -2px;
        z-index: 999;
    }
}
</style>
