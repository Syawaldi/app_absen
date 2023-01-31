<?php

namespace App\Filament\Resources\AddabsenResource\Pages;

use App\Filament\Resources\AddabsenResource;
use Filament\Resources\Pages\Page;

class AbsenIndex extends Page
{
    protected static string $resource = AddabsenResource::class;

    protected static string $view = 'filament.resources.addabsen-resource.pages.absen-index';
}
