import { UserRepository } from "../../repositories";
import { ApiError, CryptoPassword } from "../../utils";
import IUpdatePasswordUseCaseDTO from "./IUpdatePasswordUseCaseDTO";

class UpdatePasswordUseCase {
  async run(data: IUpdatePasswordUseCaseDTO) {
    const user = await UserRepository.findById(data.userId);

    if (!!!user) throw new ApiError(400, "User not found");

    const isValidPassword = CryptoPassword.comparePassword(
      data.password,
      user.password
    );

    if (!isValidPassword) throw new ApiError(400, "Senha incorreta");

    const passwordEc = CryptoPassword.generationHash(data.newPassword);

    return await UserRepository.update({
      where: {
        id: data.userId,
      },
      data: {
        password: passwordEc,
      },
    });
  }
}
export default new UpdatePasswordUseCase();
