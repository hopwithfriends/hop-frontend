import { ApiService } from './services';

export class ServiceMethods {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [x: string]: any;
  fetchFriends() {
    throw new Error('Method not implemented.');
  }
  private accessToken = '';
  private refreshToken = '';
  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
  apiService() {
    return new ApiService(this.accessToken, this.refreshToken);
  }
  async fetchUser() {
    return this.apiService().get('/user');
  }
  async fetchUpdateUser(
    username: string,
    nickname: string,
    ProfilePicture: string
  ) {
    return this.apiService().put('/user', {
      username,
      nickname,
      ProfilePicture
    });
  }

  async fetchAllFriends() {
    return this.apiService().get('/user/friend');
  }
  async fetchAddFriend(friendId: string) {
    return this.apiService().post(`/user/friend/${friendId}`, {});
  }
  async fetchRemoveFriend(friendId: string) {
    return this.apiService().delete(`/user/friend/${friendId}`, {});
  }

  async fetchCreateSpace(name: string, theme: string) {
    console.log(name, theme);
    return this.apiService().post('/space', { name, theme });
  }
  async fetchRemoveSpace(spaceId: string) {
    return this.apiService().delete(`/space/${spaceId}`, {});
  }
  async fetchAddFriendToSpace(spaceId: string, friendId: string) {
    return this.apiService().post('/space/addUser', { friendId });
  }
  async fetchUserSpaces() {
    return this.apiService().get('/space/myspaces');
  }
  async fetchInvitedSpace() {
    return this.apiService().get('/space/invitedspaces');
  }
}