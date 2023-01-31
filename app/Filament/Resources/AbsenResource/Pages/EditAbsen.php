<?php

namespace App\Filament\Resources\AbsenResource\Pages;

use App\Filament\Resources\AbsenResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAbsen extends EditRecord
{
    protected static string $resource = AbsenResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
