export abstract class RandomString {
  static generateRandomString(size: number) {
    const randomChars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

    let randomString = "";
    for (let i = 0; i < size; i++) {
      const index = Math.floor(Math.random() * randomChars.length);

      randomString += randomChars[index];
    }

    return randomString;
  }
}
