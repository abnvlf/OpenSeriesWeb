"use client";

import Codeblock from "@/components/Codeblock";

export default function Home() {
    return (
        <Codeblock
            data={{
                data: {
                    code: `# ==========================================
# Playground Python untuk OpenSeries Library
# ==========================================

import OpenSeries.matematika as matematika
import OpenSeries.fisika as fisika
import OpenSeries.statistika as statistika
import numpy as np

radian = 1
print('radian_ke_derajat', matematika.radian_ke_derajat(radian))

jari = 10
print('luas_lingkaran', matematika.luas_lingkaran(jari))

print('keliling_lingkaran', matematika.keliling_lingkaran(jari))

print('diameter_lingkaran', matematika.diameter_lingkaran(jari))

print('persamaan_kuadrat', matematika.persamaan_kuadrat(1, -3, 2))

waktu = 2.3
jarak = 4
print('kecepatan', fisika.kecepatan(jarak, waktu))

masa_benda = 14
kecepatan_benda = 23.4
print('energi_kinetik', fisika.energi_kinetik(masa_benda, kecepatan_benda))

massa_benda = 14
volume_benda = 8
print('masa_jenis', fisika.masa_jenis(massa_benda, volume_benda))

massa_benda_potensial = 12
gravitasi_bumi = 9.78
ketinggian_benda = 400
print('energi_potensial', fisika.energi_potensial(massa_benda_potensial, gravitasi_bumi, ketinggian_benda))

kuat_arus = 30
hambatan = 3
print('hukum_ohm', fisika.hukum_ohm(kuat_arus, hambatan))

label = [1, 1, 2, 2, 3, 3]
hasil_base_2 = statistika.entropy(label, base=2)
print('entropy', hasil_base_2)

vektor = np.array([1, 2, 3, 4, 5])
hasil = statistika.standar_deviasi(vektor)
print('standar_deviasi', hasil)
`
                }
            }}
        />
    );
}
