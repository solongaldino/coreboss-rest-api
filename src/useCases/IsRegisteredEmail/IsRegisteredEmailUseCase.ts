import { UserRepository } from "../../repositories";
import { ApiError } from "../../utils";
import IIRegisteredEmailUseCaseDTO from "./IIsRegisteredEmailUseCaseDTO";

class IsRegisteredEmailUseCase {
  async run(data: IIRegisteredEmailUseCaseDTO) {
    const user = await UserRepository.findByEmail(data.email);
    if (!!!user) throw new ApiError(400, "Usuário não encontrado");
    return true;
  }
}
export default new IsRegisteredEmailUseCase();
