import { ApiService } from './services';

export type UserType = {
  id: string;
  username: string;
  nickname: string;
  profilePicture: string;
  createdAt: string;
};

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
  async fetchUser(): Promise<UserType> {
    return this.apiService().get('/user');
  }

  async fetchUpdateUser(
    username: string,
    nickname: string,
    profilePicture: string
  ) {
    return this.apiService().put('/user', {
      username,
      nickname,
      profilePicture
    });
  }

  async fetchAddFriend(username: string) {
    return this.apiService().post(`/user/friend/request/${username}`, {});
  }

  async fetchAllFriendRequests() {
    return this.apiService().get('/user/friend/request');
  }

  async fetchAcceptFriendRequest(requestId: string) {
    return this.apiService().post(`/user/friend/addRequest/${requestId}`, {});
  }

  async fetchDeclineFriendRequest(requestId: string) {
    return this.apiService().delete(`/user/friend/request/${requestId}`, {});
  }

  async fetchRemoveFriend(friendId: string) {
    return this.apiService().delete(`/user/friend/${friendId}`, {});
  }
  async fetchAllFriends() {
    return this.apiService().get('/user/friend');
  }

  async fetchSpaceById(spaceId: string) {
    return this.apiService().get(`/spaceId/${spaceId}`);
  }
  async fetchCreateSpace(
    id: string,
    name: string,
    flyUrl: string,
    theme: string,
    password: string
  ) {
    return this.apiService().post('/space', {
      name,
      theme,
      id,
      password,
      flyUrl
    });
  }
  async fetchRemoveSpace(spaceId: string) {
    return this.apiService().delete(`/space/${spaceId}`, {});
  }

  async fetchUpdateSpace(
    spaceId: string,
    spaceName: string,
    spaceTheme: string
  ) {
    return this.apiService().put('/space/edit', {
      spaceId,
      spaceName,
      spaceTheme
    });
  }

  async fetchSendSpaceRequests(
    spaceId: string,
    friendId: string,
    role: string
  ) {
    return this.apiService().post('/space/request', {
      spaceId: spaceId,
      friendId: friendId,
      role: role
    });
  }
  async fetchAllSpaceRequests() {
    return this.apiService().get('/space/request');
  }
  async fetchAcceptSpaceRequest(requestId: string) {
    return this.apiService().post(`/space/request/${requestId}`, {});
  }
  async fetchDeclineSpaceRequest(requestId: string) {
    return this.apiService().delete(`/space/request/${requestId}`, {});
  }
  async fetchRemoveUserFromSpace(spaceId: string, userId: string) {
    return this.apiService().delete(`/space/${spaceId}/${userId}`, {});
  }
  async fetchUserSpaces() {
    return this.apiService().get('/space/mySpaces');
  }

  async fetchInvitedSpace() {
    return this.apiService().get('/space/invitedSpaces');
  }
  async fetchSpaceMembers(spaceId: string) {
    return this.apiService().get(`space/spaceMembers/${spaceId}`);
  }

  async fetchSpaceOwner(spaceId: string) {
    return this.apiService().get(`/space/ownSpaceRole/${spaceId}`);
  }
  async fetchUpdateSpaceRole(spaceId: string, userId: string, role: string) {
    return this.apiService().put('/space/changeRole', {
      userId: userId,
      spaceId: spaceId,
      role: role
    });
  }
}
