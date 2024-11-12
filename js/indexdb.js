var request = indexedDB.open("KomentarDatabase", 1);

        request.onupgradeneeded = function(event) {
            var db = event.target.result;

            var store = db.createObjectStore("KomentarStore", { keyPath: "id", autoIncrement: true });
            store.createIndex("nama", "nama", { unique: false });
            store.createIndex("email", "email", { unique: false });
            store.createIndex("komentar", "komentar", { unique: false});
        };

        request.onsuccess = function(event) {
            var db = event.target.result;

            document.getElementById("komentarForm").addEventListener("submit", function(e) {
                e.preventDefault();

                var nama = document.getElementById("nama").value;
                var email = document.getElementById("email").value;
                var komentar = document.getElementById("komentar").value;

                var transaction = db.transaction(["KomentarStore"], "readwrite");

                transaction.oncomplete = function() {
                    console.log ("Komentar telah disimpan.");
                    document.getElementById("komentarForm").reset();
                    // tampilkanKomentar();
                };

                transaction.onerror = function(event) {
                    console.error("Kesalahan saat menyimpan komentar: " + event.target.error);
                };

                var store = transaction.objectStore("KomentarStore");
                var komentarData = {
                    nama: nama,
                    email: email,
                    komentar: komentar
                };
                var request = store.add(komentarData);
            });
        };

        request.onerror = function(event) {
            console.error("Kesalahan saat membuka database IndexedDB: " + event.target.error);
        };