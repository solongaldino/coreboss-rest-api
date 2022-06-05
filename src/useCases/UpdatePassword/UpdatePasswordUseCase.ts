import { IUserRepository } from "@repositories/prisma";
import { ApiError, CryptoPassword } from "@utils";
import { inject, injectable } from "tsyringe";
import IUpdatePasswordUseCase from "./IUpdatePasswordUseCase";
import IUpdatePasswordUseCaseDTO from "./IUpdatePasswordUseCaseDTO";

@injectable()
export default class UpdatePasswordUseCase implements IUpdatePasswordUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async run(data: IUpdatePasswordUseCaseDTO) {
    const user = await this.userRepository.findById(data.userId);

    if (!!!user) throw new ApiError(400, "User not found");

    const isValidPassword = CryptoPassword.comparePassword(
      data.password,
      user.password
    );

    if (!isValidPassword) throw new ApiError(400, "Senha incorreta");

    const passwordEc = CryptoPassword.generationHash(data.newPassword);

    await this.userRepository.update({
      where: {
        id: data.userId,
      },
      data: {
        password: passwordEc,
      },
    });
  }
}
