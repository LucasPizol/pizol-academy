export abstract class Permissions {
  static CheckAdminPermission(permission: string) {
    return permission === "owner" || permission === "teacher";
  }
}
