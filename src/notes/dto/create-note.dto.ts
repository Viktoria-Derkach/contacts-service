import { IsString, Length } from 'class-validator';
import { NoEmojis } from '../../validators/NoEmoji.validator';

export class CreateNoteDto {
  @Length(2, 4000)
  @NoEmojis({ message: 'Note contains invalid characters' })
  @IsString()
  note: string;
}
