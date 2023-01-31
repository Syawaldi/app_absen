<x-filament::page>
<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            .body-frame{
                margin: 0;
                padding: 0;
                display: flex;
                /* justify-content: center;
                align-items: center;
                flex-direction: column; */
            }
            canvas{
                /* position: absolute; */
                padding-left: 10%;
            }
        </style>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>

    <body>
        <form class="" method="POST" id="video">
            <input type="hidden" id="test" value="cek"/>
            <input type="hidden" id="url" value="{{ url('/absen') }}"/>
            <div class="form-group">
                <label for="nama">Nama</label>
                <input type="text" class="form-control" id="nama" aria-describedby="namaHelp" placeholder="Masukan Nama">
                <small id="namaHelp" class="form-text text-muted">Masukan nama Pegawai / Mahasiswa diatas sini.</small>
            </div>
            <div class="body-frame">
                <video id="videoInput" width="500" height="500" autoplay muted>
            </div>
        </form>

        <center>
            <button type="submit" onclick='save_data()' id="target" class="btn btn-primary">
                Add Absen
            </button>
        </center>
    </body>

    <script defer async src="{{ URL::asset('js/face-api.min.js') }} "></script>
    <script defer async src="{{ URL::asset('js/script.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.2/jquery.min.js" integrity="sha512-tWHlutFnuG0C6nQRlpvrEhE4QpkG1nn2MOUMWmUeRePl4e3Aki0VB6W1v3oLjFtd0hVOtRQ9PHpSfN6u6/QXkQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

</html>
</x-filament::page>
