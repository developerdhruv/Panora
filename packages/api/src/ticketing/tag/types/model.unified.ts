import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UnifiedTagInput {
  @ApiProperty({
    type: String,
    description: 'The name of the tag',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: {},
    description:
      'The custom field mappings of the tag between the remote 3rd party & Panora',
  })
  @IsOptional()
  field_mappings?: Record<string, any>;
}

export class UnifiedTagOutput extends UnifiedTagInput {
  @ApiPropertyOptional({ type: String, description: 'The uuid of the tag' })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'The id of the tag in the context of the 3rd Party',
  })
  @IsString()
  @IsOptional()
  remote_id?: string;

  @ApiPropertyOptional({
    type: {},
    description: 'The remote data of the tag in the context of the 3rd Party',
  })
  @IsOptional()
  remote_data?: Record<string, any>;
}
