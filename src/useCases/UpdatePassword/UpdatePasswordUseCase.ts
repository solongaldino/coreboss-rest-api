import { UserRepository } from "../../repositories";
import { ApiError, CryptoPassword } from "../../utils";
import IUpdatePasswordUseCaseDTO from "./IUpdatePasswordUseCaseDTO";

class UpdatePasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private cryptoPassword: CryptoPassword
  ) {}

  async run(data: IUpdatePasswordUseCaseDTO) {
    const user = await this.userRepository.findById(data.userId);

    if (!!!user) throw new ApiError(400, "User not found");

    const isValidPassword = this.cryptoPassword.comparePassword(
      data.password,
      user.password
    );

    if (!isValidPassword) throw new ApiError(400, "Senha incorreta");

    const passwordEc = this.cryptoPassword.generationHash(data.newPassword);

    return await this.userRepository.update({
      where: {
        id: data.userId,
      },
      data: {
        password: passwordEc,
      },
    });
  }
}
export default UpdatePasswordUseCase;
