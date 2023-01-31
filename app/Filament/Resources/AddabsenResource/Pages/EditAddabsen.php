<?php

namespace App\Filament\Resources\AddabsenResource\Pages;

use App\Filament\Resources\AddabsenResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAddabsen extends EditRecord
{
    protected static string $resource = AddabsenResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
