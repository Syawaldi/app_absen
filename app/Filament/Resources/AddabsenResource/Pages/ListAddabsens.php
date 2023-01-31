<?php

namespace App\Filament\Resources\AddabsenResource\Pages;

use App\Filament\Resources\AddabsenResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAddabsens extends ListRecords
{
    protected static string $resource = AddabsenResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
