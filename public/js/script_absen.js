
Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/face_models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/face_models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/face_models') //heavier/accurate version of tiny face detector
]).then(start)

function start() {
    const video = document.getElementById('videoInput')

    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )

    // navigator.mediaDevices.getUserMedia({
    //     video: true
    // }).then(
    //   stream => (video.srcObject = stream),
    //   err => console.log(err)
    // );

    console.log('video added')
    recognizeFaces()
}

async function recognizeFaces() {

    const labeledDescriptors = await loadLabeledImages3()
    // console.log(labeledDescriptors)
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7)
    var video = document.getElementById('videoInput')

    video.addEventListener('play', async () => {
        console.log('Playing')

        const canvas = faceapi.createCanvasFromMedia(video)
        $('.body-frame').append(canvas)
        canvas.setAttribute('id','canvas')

        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)

        setInterval(async () => {
            // console.log('here here');
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()

            if(detections.length == '0'){
                $('#videoInput').hide();
            }else{
                $('#videoInput').show();
            }

            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })

            results.forEach( (result, i) => {
                const box       = resizedDetections[i].detection.box
                const drawBox   = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvas)
            })
        }, 200)
    })
}

function loadLabeledImages() {
    const labels = ['Febri', 'Masbay'] // for WebCam

    return Promise.all(
        labels.map(async (label)=>{
            const descriptions = []
            for(let i=1; i<=2; i++) {
                const img = await faceapi.fetchImage(`../labeled_images/${label}/${i}.jpg`)
                // console.log(img)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                descriptions.push(detections.descriptor)
            }
            // console.log(JSON.stringify(descriptions))
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}

function loadLabeledImages3(){
    const aa = "-0.14824381470680237,0.12521322071552277,0.00300956261344254,-0.029628781601786613,-0.11422459781169891,-0.0692857876420021,-0.05109743773937225,-0.09110110998153687,0.17069454491138458,-0.05399338901042938,0.2338368445634842,0.04181971773505211,-0.18802917003631592,-0.18480144441127777,-0.07802017033100128,0.1434267908334732,-0.22071723639965057,-0.11141704022884369,0.007642695214599371,0.0006503672921098769,0.11650528758764267,0.04743867367506027,0.0833844542503357,0.07843440026044846,-0.0299411378800869,-0.3843930661678314,-0.07060035318136215,-0.14325816929340363,-0.01951964572072029,-0.09213502705097198,0.016458921134471893,-0.003492276417091489,-0.19201251864433289,-0.06979275494813919,-0.04142805561423302,0.06418519467115402,-0.0388498418033123,0.015004313550889492,0.1361282914876938,-0.04252972453832626,-0.1914995312690735,-0.048447515815496445,0.021603047847747803,0.25736311078071594,0.18934138119220734,0.08347753435373306,0.013793948106467724,-0.08170364052057266,0.05099572613835335,-0.18442019820213318,0.03300551325082779,0.1448243111371994,0.09414298087358475,0.00022744419402442873,0.06691072881221771,-0.11670995503664017,-0.015448076650500298,0.05874122679233551,-0.14658832550048828,0.0013065808452665806,-0.0320732556283474,-0.0007949277642183006,0.005591523367911577,-0.04275771975517273,0.26490768790245056,0.06452403962612152,-0.10970937460660934,-0.10704710334539413,0.13670498132705688,-0.2336842268705368,-0.12091103196144104,0.06870394945144653,-0.0905969962477684,-0.21105161309242249,-0.328877717256546,-0.03481840342283249,0.3702269494533539,0.08837690949440002,-0.18107004463672638,0.019129395484924316,-0.07240282744169235,-0.03243020921945572,0.0809658095240593,0.11167782545089722,-0.06225564330816269,0.07189445197582245,-0.15093666315078735,-0.0350242555141449,0.17391036450862885,-0.0490272119641304,-0.052437976002693176,0.24953395128250122,0.017259102314710617,0.05469049885869026,0.0650709792971611,0.027630344033241272,0.014096127822995186,0.04842650890350342,-0.13105487823486328,0.01634666509926319,0.019624954089522362,-0.09701256453990936,-0.05944972112774849,0.05836674943566322,-0.14020973443984985,0.04262472316622734,0.023510435596108437,0.013869226910173893,-0.04318053275346756,0.013124573044478893,-0.17204347252845764,-0.10762608051300049,0.15665651857852936,-0.22019344568252563,0.25478339195251465,0.20053023099899292,0.008887458592653275,0.18755793571472168,0.06245322898030281,0.08804134279489517,-0.04954780265688896,-0.10370419919490814,-0.112798772752285,-0.03305540606379509,0.06471315026283264,-0.06156325712800026,0.0678456500172615,0.0183425135910511";

    const arr = Float32Array.from(aa.split(","), parseFloat);
    const descriptions = []

    descriptions.push(arr)
    return new faceapi.LabeledFaceDescriptors('testing', descriptions)
}
