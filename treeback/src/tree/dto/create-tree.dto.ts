import {
    IsBoolean,
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTreeDto {
    @ApiProperty({ description: 'The name of the tree', maxLength: 25 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(25)
    treeName: string;

    @ApiProperty({
        description: 'Datetime of the tree entry',
        default: () => 'CURRENT_TIMESTAMP',
    })
    @IsOptional()
    @IsDateString()
    datetime?: Date;

    @ApiProperty({ description: 'Path to the tree photo', required: false })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    pathPhoto?: string;

    @ApiProperty({ description: 'City block number' })
    @IsNumber()
    cityBlock: number;

    @ApiProperty({ description: 'Perimeter of the tree', required: false })
    @IsOptional()
    @IsString()
    perimeter?: number;

    @ApiProperty({ description: 'Height of the tree', required: false })
    @IsOptional()
    @IsString()
    height?: number;

    @ApiProperty({ description: 'Incline of the tree', required: false })
    @IsOptional()
    @IsString()
    incline?: number;

    @ApiProperty({
        description: 'Number of trees in the block',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    treesInTheBlock?: number;

    @ApiProperty({ description: 'Use under the tree', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    useUnderTheTree?: string;

    @ApiProperty({ description: 'Frequency of use', required: false })
    @IsOptional()
    @IsNumber()
    frequencyUse?: number;

    @ApiProperty({ description: 'Potential damage', required: false })
    @IsOptional()
    @IsNumber()
    potentialDamage?: number;

    @ApiProperty({ description: 'Is the tree movable?', required: false })
    @IsOptional()
    @IsBoolean()
    isMovable?: boolean;

    @ApiProperty({ description: 'Is the tree restrictable?', required: false })
    @IsOptional()
    @IsBoolean()
    isRestrictable?: boolean;

    @ApiProperty({ description: 'Is the tree missing?', required: false })
    @IsOptional()
    @IsBoolean()
    isMissing?: boolean;

    @ApiProperty({ description: 'Is the tree dead?', required: false })
    @IsOptional()
    @IsBoolean()
    isDead?: boolean;

    @ApiProperty({
        description: 'Does the tree have exposed roots?',
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    exposedRoots?: boolean;

    @ApiProperty({ description: 'DCH value', required: false })
    @IsOptional()
    @IsString()
    dch?: number;

    @ApiProperty({
        description: 'Wind exposure',
        required: false,
        enum: [
            'expuesto',
            'parcialmente expuesto',
            'protegido',
            'tunel de viento',
        ],
    })
    @IsOptional()
    @IsEnum([
        'expuesto',
        'parcialmente expuesto',
        'protegido',
        'tunel de viento',
    ])
    windExposure?:
        | 'expuesto'
        | 'parcialmente expuesto'
        | 'protegido'
        | 'tunel de viento';

    @ApiProperty({
        description: 'Tree vigor',
        required: false,
        enum: ['excelente', 'normal', 'pobre'],
    })
    @IsOptional()
    @IsEnum(['excelente', 'normal', 'pobre'])
    vigor?: 'excelente' | 'normal' | 'pobre';

    @ApiProperty({
        description: 'Canopy density',
        required: false,
        enum: ['escasa', 'normal', 'densa'],
    })
    @IsOptional()
    @IsEnum(['escasa', 'normal', 'densa'])
    canopyDensity?: 'escasa' | 'normal' | 'densa';

    @ApiProperty({
        description: 'Growth space',
        required: false,
        enum: [
            'sin cazuela',
            'cazuela = 1 - 2 m2',
            'cazuela > 2 m2',
            'vereda jardín',
        ],
    })
    @IsOptional()
    @IsEnum([
        'sin cazuela',
        'cazuela = 1 - 2 m2',
        'cazuela > 2 m2',
        'vereda jardín',
    ])
    growthSpace?:
        | 'sin cazuela'
        | 'cazuela = 1 - 2 m2'
        | 'cazuela > 2 m2'
        | 'vereda jardín';

    @ApiProperty({
        description: 'Tree value',
        required: false,
        enum: [
            'historico',
            'monumental',
            'singular',
            'notable',
            'plaza/parque (ornamental)',
            'reclamo',
        ],
    })
    @IsOptional()
    @IsEnum([
        'historico',
        'monumental',
        'singular',
        'notable',
        'plaza/parque (ornamental)',
        'reclamo',
    ])
    treeValue?:
        | 'historico'
        | 'monumental'
        | 'singular'
        | 'notable'
        | 'plaza/parque (ornamental)'
        | 'reclamo';

    @ApiProperty({
        description: 'Street materiality',
        required: false,
        enum: [
            'tierra',
            'mejorado petroleo',
            'asfalto',
            'concreto',
            'cordon cuneta',
        ],
    })
    @IsOptional()
    @IsEnum([
        'tierra',
        'mejorado petroleo',
        'asfalto',
        'concreto',
        'cordon cuneta',
    ])
    streetMateriality?:
        | 'tierra'
        | 'mejorado petroleo'
        | 'asfalto'
        | 'concreto'
        | 'cordon cuneta';

    @ApiProperty({ description: 'Neighborhood ID', required: true })
    @IsNumber()
    @IsNotEmpty()
    neighborhoodId: number;

    @ApiProperty({ description: 'Project ID', required: true })
    @IsNumber()
    @IsNotEmpty()
    projectId: number;

    @ApiProperty({ description: 'Tree Type ID', required: true })
    @IsNumber()
    @IsNotEmpty()
    treeTypeId: number;

    @ApiProperty({ description: 'Coordinate ID', required: true })
    @IsNumber()
    @IsNotEmpty()
    coordinateId: number;
}
