import { Fragment, useState, useEffect } from 'react'
import '../../../../../styles/TrackList.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchPolls, addPoll } from '../../../../../store/slices/operationCareSlice'
import ErrorOccurred from '../../../../custom/ErrorOccurred'
import Loader from '../../../../custom/Loader'

function TrackList() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { polls, loading, error } = useSelector((store) => store.operationCare)
  const [selectedPoll, setSelectedPoll] = useState(null)
  const [filteredPolls, setFilteredPolls] = useState([])

  useEffect(() => {
    dispatch(fetchPolls())
  }, [dispatch])

  useEffect(() => {
    if (polls && Array.isArray(polls)) {
      const filtered = polls.filter((poll) => poll.Poll_Operation_Care == id)
      setFilteredPolls(filtered)
    }
  }, [polls, id])

  const categories = [
    {
      title: 'FV Modüller',
      rows: [
        {
          id: '1.1',
          description: 'FV panel yüzey temizliği kontrolü',
          method: 'Görsel',
          answerKey: 'answer_1_1',
          noteKey: 'Note_1_1',
        },
        {
          id: '1.2',
          description: 'FV panel fiziksel kontrolü (Kırık-Çatlak-hücre Yanığı vs)',
          method: 'Görsel + Termal Kamera',
          answerKey: 'answer_1_2',
          noteKey: 'Note_1_2',
        },
        {
          id: '1.3',
          description: 'Diziler arası kablo elektriksel bağlantı kontrolü',
          method: 'Görsel + Termal Kamera',
          answerKey: 'answer_1_3',
          noteKey: 'Note_1_3',
        },
        {
          id: '1.4',
          description: 'Diziler arası kablo terminal bağlantı kontrolü (JUNCTION BOX - KONNEKTÖR)',
          method: 'Görsel + Termal Kamera',
          answerKey: 'answer_1_4',
          noteKey: 'Note_1_4',
        },
        {
          id: '1.5',
          description: 'Dizilerin açık devre gerilim ölçümü ( PANEL x 40-45V )',
          method: 'Ölçü aleti',
          answerKey: 'answer_1_5',
          noteKey: 'Note_1_5',
        },
        {
          id: '1.6',
          description: 'Dizilerin kısa devre akım ölçümü (PANEL DATASHEET 12-13A)',
          method: 'Ölçü aleti',
          answerKey: 'answer_1_6',
          noteKey: 'Note_1_6',
        },
      ],
    },
    {
      title: 'İnverter',
      rows: [
        {
          id: '2.1',
          description: 'Çalışan ekipmanların durum kontrolü',
          method: 'Görsel',
          answerKey: 'answer_2_1',
          noteKey: 'Note_2_1',
        },
        {
          id: '2.2',
          description: 'Tüm bağlantıların kontrol edilmesi (kablo, klemens vida vb.)',
          method: 'Görsel + Mekanik + Termal Kamera',
          answerKey: 'answer_2_2',
          noteKey: 'Note_2_2',
        },
        {
          id: '2.3',
          description: 'DC-AC voltaj test ve kontrolü (en düşük ve en yüksek)',
          method: 'Görsel + Ölçü aleti',
          answerKey: 'answer_2_3',
          noteKey: 'Note_2_3',
        },
        {
          id: '2.4',
          description: 'Hata kayıtları incelenmesi ve led ekran çalışma kontrolü',
          method: 'Görsel ve Yazılım',
          answerKey: 'answer_2_4',
          noteKey: 'Note_2_4',
        },
        {
          id: '2.5',
          description: 'Kablo etiketleme kontrolü',
          method: 'Görsel',
          answerKey: 'answer_2_5',
          noteKey: 'Note_2_5',
        },
        {
          id: '2.6',
          description: 'Giriş ve çıkış fan ızgaralarının ve ilgili filtrelerin kontrolü',
          method: 'Görsel ve Mekanik',
          answerKey: 'answer_2_6',
          noteKey: 'Note_2_6',
        },
        {
          id: '2.7',
          description: 'Fanın çalışma ve toz kontrolü',
          method: 'Görsel ve Mekanik',
          answerKey: 'answer_2_7',
          noteKey: 'Note_2_7',
        },
      ],
    },
    {
      title: 'DC Kablo',
      rows: [
        {
          id: '3.1',
          description: 'Kablo yüzey kontrolü',
          method: 'Görsel',
          answerKey: 'answer_3_1',
          noteKey: 'Note_3_1',
        },
        {
          id: '3.2',
          description: 'Kablo taşıma elemanları bağlantı kontrolü',
          method: 'Görsel',
          answerKey: 'answer_3_2',
          noteKey: 'Note_3_2',
        },
        {
          id: '3.3',
          description: 'Kablo etiketleme kontrolü',
          method: 'Görsel',
          answerKey: 'answer_3_3',
          noteKey: 'Note_3_3',
        },
        {
          id: '3.4',
          description: 'Kablo rogarları kontrol - Pano Güzergahı',
          method: 'Görsel',
          answerKey: 'answer_3_4',
          noteKey: 'Note_3_4',
        },
      ],
    },
    {
      title: 'AC Panolar',
      rows: [
        {
          id: '4.1',
          description: 'Kablo bağlantı terminallerinin kontrolü',
          method: 'Görsel + Termal Kamera',
          answerKey: 'answer_4_1',
          noteKey: 'Note_4_1',
        },
        {
          id: '4.2',
          description: 'İkaz işaretleri kontrolü',
          method: 'Görsel',
          answerKey: 'answer_4_2',
          noteKey: 'Note_4_2',
        },
        {
          id: '4.3',
          description: 'Sigorta, parafudur, devre kesicisi vs. kontrolü',
          method: 'Görsel',
          answerKey: 'answer_4_3',
          noteKey: 'Note_4_3',
        },
        {
          id: '4.4',
          description: 'Su ve toz geçirgenlik kontrolü ve paslanma kontrolü',
          method: 'Görsel',
          answerKey: 'answer_4_4',
          noteKey: 'Note_4_4',
        },
        {
          id: '4.5',
          description: 'Şalter Bağlantıları kontrolü',
          method: 'Tork',
          answerKey: 'answer_4_5',
          noteKey: 'Note_4_5',
        },
      ],
    },
    {
      title: 'Topraklama',
      rows: [
        {
          id: '5.1',
          description: 'Topraklama sisteminin genel kontrolü',
          method: 'Görsel',
          answerKey: 'answer_5_1',
          noteKey: 'Note_5_1',
        },
        {
          id: '5.2',
          description: 'Topraklama iletkenlerinin bağlantı kontrolü, ölçülmesi ve denetlenmesi',
          method: 'Görsel ve ölçü aleti',
          answerKey: 'answer_5_2',
          noteKey: 'Note_5_2',
        },
        {
          id: '5.3',
          description: 'Topraklama direnci ölçümü',
          method: 'Ölçü aleti',
          answerKey: 'answer_5_3',
          noteKey: 'Note_5_3',
        },
        {
          id: '5.4',
          description: 'Yıldırımdan koruma sisteminin kontrolü',
          method: 'Ölçü aleti',
          answerKey: 'answer_5_4',
          noteKey: 'Note_5_4',
        },
      ],
    },
    {
      title: 'Konstrüksiyon',
      rows: [
        {
          id: '6.1',
          description: 'Korozyon kontrolü',
          method: 'Görsel ve Ölçü aleti',
          answerKey: 'answer_6_1',
          noteKey: 'Note_6_1',
        },
        {
          id: '6.2',
          description: 'Bağlantı noktalarında cıvata gevşeklik kontrolü',
          method: 'Görsel + Mekanik',
          answerKey: 'answer_6_2',
          noteKey: 'Note_6_2',
        },
        {
          id: '6.3',
          description: 'Panel bağlantı elemanları gevşeklik kontrolü',
          method: 'Görsel + Mekanik',
          answerKey: 'answer_6_3',
          noteKey: 'Note_6_3',
        },
        {
          id: '6.4',
          description: 'Kolonların temel sağlamlık kontrolü',
          method: 'Görsel + Mekanik',
          answerKey: 'answer_6_4',
          noteKey: 'Note_6_4',
        },
        {
          id: '6.5',
          description: 'Masalarda dalgalanma kontrolü',
          method: 'Görsel + Mekanik',
          answerKey: 'answer_6_5',
          noteKey: 'Note_6_5',
        },
        {
          id: '6.6',
          description: 'Panel eğim açısı kontrolü',
          method: 'Görsel + Mekanik',
          answerKey: 'answer_6_6',
          noteKey: 'Note_6_6',
        },
      ],
    },
    {
      title: 'Aydınlatma ve Kamera',
      rows: [
        {
          id: '7.1',
          description: 'Kamera ve Armatür sağlamlık kontrolleri',
          method: 'Görsel',
          answerKey: 'answer_7_1',
          noteKey: 'Note_7_1',
        },
        {
          id: '7.2',
          description: 'Kamera kapsama alanı ve armatür aydınlık seviyesi kontrolü',
          method: 'Görsel + Ölçü aleti',
          answerKey: 'answer_7_2',
          noteKey: 'Note_7_2',
        },
        {
          id: '7.3',
          description: 'Kamera montaj elemanları gevşeklik kontrolü',
          method: 'Görsel + Mekanik',
          answerKey: 'answer_7_3',
          noteKey: 'Note_7_3',
        },
        {
          id: '7.4',
          description: 'Görüntü kalitesi kontrolü',
          method: 'Görsel',
          answerKey: 'answer_7_4',
          noteKey: 'Note_7_4',
        },
        {
          id: '7.5',
          description: 'Kamera kayıt sistemi kontrolü',
          method: 'Görsel + Yazılım',
          answerKey: 'answer_7_5',
          noteKey: 'Note_7_5',
        },
        {
          id: '7.6',
          description: 'Kamera switch bağlantı kontrolü',
          method: 'Görsel',
          answerKey: 'answer_7_6',
          noteKey: 'Note_7_6',
        },
        {
          id: '7.7',
          description: 'Aydınlatma elektriksel ve mekanik bağlantı kontrolü',
          method: 'Görsel + Ölçü aleti',
          answerKey: 'answer_7_7',
          noteKey: 'Note_7_7',
        },
      ],
    },
    {
      title: 'GES TR',
      rows: [
        {
          id: '8.1',
          description: 'Genel Temizlik kontrolü',
          method: 'Görsel',
          answerKey: 'answer_8_1',
          noteKey: 'Note_8_1',
        },
        {
          id: '8.2',
          description: 'OG hücre kontrolü (Giriş, Çıkış, Ölçü ve TR Koruma)',
          method: 'Görsel',
          answerKey: 'answer_8_2',
          noteKey: 'Note_8_2',
        },
        {
          id: '8.3',
          description: 'Orta Gerilim kablo izolasyon kontrolü',
          method: 'Görsel',
          answerKey: 'answer_8_3',
          noteKey: 'Note_8_3',
        },
        {
          id: '8.4',
          description: 'Topraklama izolasyon kontrolü',
          method: 'Görsel + Mekanik',
          answerKey: 'answer_8_4',
          noteKey: 'Note_8_4',
        },
        {
          id: '8.5',
          description: 'Trafo AG ve OG çıkış gerilimlerinin kontrolü',
          method: 'Görsel',
          answerKey: 'answer_8_5',
          noteKey: 'Note_8_5',
        },
        {
          id: '8.6',
          description: 'Trafo sıcaklık kontrolü',
          method: 'Görsel',
          answerKey: 'answer_8_6',
          noteKey: 'Note_8_6',
        },
        {
          id: '8.7',
          description: 'Redresör fonksiyon kontrolü',
          method: 'Görsel + Ölçü aleti',
          answerKey: 'answer_8_7',
          noteKey: 'Note_8_7',
        },
        {
          id: '8.8',
          description: 'Trafo primer ve sekonder bağlantı kontrolü',
          method: 'Görsel + Mekanik',
          answerKey: 'answer_8_8',
          noteKey: 'Note_8_8',
        },
      ],
    },
    {
      title: 'Saha Bak.',
      rows: [
        {
          id: '9.1',
          description: 'Yüzey üzerindeki bitkilerin temizlik durumu raporlanması',
          method: 'Görsel',
          answerKey: 'answer_9_1',
          noteKey: 'Note_9_1',
        },
        {
          id: '9.2',
          description: 'Drenaj sistemi kontrol ve temizlik durumu raporlanması',
          method: 'Görsel',
          answerKey: 'answer_9_2',
          noteKey: 'Note_9_2',
        },
        {
          id: '9.3',
          description: 'Saha içi yolların durum raporu',
          method: 'Görsel',
          answerKey: 'answer_9_3',
          noteKey: 'Note_9_3',
        },
        {
          id: '9.4',
          description: 'Yangın tüplerinin kontrolü',
          method: 'Görsel + Mekanik',
          answerKey: 'answer_9_4',
          noteKey: 'Note_9_4',
        },
        {
          id: '9.5',
          description: 'Sahadaki atık madde temizliğinin raporlanması',
          method: 'Görsel',
          answerKey: 'answer_9_5',
          noteKey: 'Note_9_5',
        },
      ],
    },
  ]

  const [data, setData] = useState({
    Note_1_1: null,
    Note_1_2: null,
    Note_1_3: null,
    Note_1_4: null,
    Note_1_5: null,
    Note_1_6: null,
    Note_2_1: null,
    Note_2_2: null,
    Note_2_3: null,
    Note_2_4: null,
    Note_2_5: null,
    Note_2_6: null,
    Note_2_7: null,
    Note_3_1: null,
    Note_3_2: null,
    Note_3_3: null,
    Note_3_4: null,
    Note_4_1: null,
    Note_4_2: null,
    Note_4_3: null,
    Note_4_4: null,
    Note_4_5: null,
    Note_5_1: null,
    Note_5_2: null,
    Note_5_3: null,
    Note_5_4: null,
    Note_6_1: null,
    Note_6_2: null,
    Note_6_3: null,
    Note_6_4: null,
    Note_6_5: null,
    Note_6_6: null,
    Note_7_1: null,
    Note_7_2: null,
    Note_7_3: null,
    Note_7_4: null,
    Note_7_5: null,
    Note_7_6: null,
    Note_7_7: null,
    Note_8_1: null,
    Note_8_2: null,
    Note_8_3: null,
    Note_8_4: null,
    Note_8_5: null,
    Note_8_6: null,
    Note_8_7: null,
    Note_8_8: null,
    Note_9_1: null,
    Note_9_2: null,
    Note_9_3: null,
    Note_9_4: null,
    Note_9_5: null,
    answer_1_1: null,
    answer_1_2: null,
    answer_1_3: null,
    answer_1_4: null,
    answer_1_5: null,
    answer_1_6: null,
    answer_2_1: null,
    answer_2_2: null,
    answer_2_3: null,
    answer_2_4: null,
    answer_2_5: null,
    answer_2_6: null,
    answer_2_7: null,
    answer_3_1: null,
    answer_3_2: null,
    answer_3_3: null,
    answer_3_4: null,
    answer_4_1: null,
    answer_4_2: null,
    answer_4_3: null,
    answer_4_4: null,
    answer_4_5: null,
    answer_5_1: null,
    answer_5_2: null,
    answer_5_3: null,
    answer_5_4: null,
    answer_6_1: null,
    answer_6_2: null,
    answer_6_3: null,
    answer_6_4: null,
    answer_6_5: null,
    answer_6_6: null,
    answer_7_1: null,
    answer_7_2: null,
    answer_7_3: null,
    answer_7_4: null,
    answer_7_5: null,
    answer_7_6: null,
    answer_7_7: null,
    answer_8_1: null,
    answer_8_2: null,
    answer_8_3: null,
    answer_8_4: null,
    answer_8_5: null,
    answer_8_6: null,
    answer_8_7: null,
    answer_8_8: null,
    answer_9_1: null,
    answer_9_2: null,
    answer_9_3: null,
    answer_9_4: null,
    answer_9_5: null,
    Cloumn_Note_Text: null,
    Cloumn_Organizer: null,
    Cloumn_Organize_Date: null,
    Cloumn_Looker: null,
    Cloumn_Looker_Date: null,
    Poll_Operation_Care: null,
    Poll_Date: null,
  })

  const createNewDate = (utc) => {
    if (!filteredPolls || filteredPolls.length === 0 || !filteredPolls[filteredPolls.length - 1].Poll_Date) {
      return null
    }

    const lastObject = filteredPolls[filteredPolls.length - 1]
    const pollDate = new Date(lastObject.Poll_Date)
    pollDate.setMonth(pollDate.getMonth() + 6)

    if (utc) return pollDate.toLocaleDateString('en-CA')
    return pollDate.toLocaleDateString()
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadio = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value === 'true' }))
  }

  const handleChangeDate = (e) => {
    const value = e.target.value

    if (!value) {
      setSelectedPoll(null)
      return
    }

    const foundPoll = filteredPolls.find((poll) => poll.Poll_Date === e.target.value)
    setSelectedPoll(foundPoll)
  }

  const handleSubmit = () => {
    const updatedData = {
      ...data,
      Poll_Operation_Care: id,
      Poll_Date: createNewDate(true),
    }

    dispatch(addPoll(updatedData))

    setData((prevData) => {
      const newData = Object.keys(prevData).reduce((acc, key) => {
        acc[key] = null
        return acc
      }, {})

      return newData
    })

    document.getElementById('scrollable-div').scrollTop = 0
  }

  if (error) return <ErrorOccurred message={error} />

  return (
    <>
      <div id='scrollable-div' className='rounded-xl shadow-xl overflow-auto no-scrollbar bg-white'>
        <table className='list-table table-auto w-full'>
          <thead className='sticky top-0 bg-soento-green text-white'>
            <tr>
              <th>NO</th>
              <th>SÖZLEŞME KAPSAMI OLAN HİZMETİN ADI</th>
              <th>KONTROL METODU</th>
              <th>
                <div className='grid grid-cols-4 gap-1 text-center leading-none text-black'>
                  <div className='col-span-2'>
                    <select className='size-full rounded p-1 outline-none bg-gray-100' onChange={handleChangeDate}>
                      <option value=''>Tarih Seçin</option>
                      {filteredPolls.slice(1).map((item, index) => (
                        <option key={index} value={item.Poll_Date}>
                          {new Date(item.Poll_Date).toLocaleDateString()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='col-span-2 rounded bg-gray-100'>
                    <span className='size-full flex items-center justify-center'>{createNewDate()}</span>
                  </div>
                  <div className='rounded p-1 bg-gray-100'>Tamam</div>
                  <div className='rounded p-1 bg-gray-100'>Değil</div>
                  <div className='rounded p-1 bg-gray-100'>Tamam</div>
                  <div className='rounded p-1 bg-gray-100'>Değil</div>
                </div>
              </th>
              <th>NOTLAR</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category, categoryIndex) => (
              <Fragment key={categoryIndex}>
                {/* Kategori Başlığı */}
                <tr className='font-bold text-gray-600 bg-slate-200'>
                  <td>{categoryIndex + 1}.</td>
                  <td colSpan='4'>{category.title}</td>
                </tr>

                {/* Kategori Satırları */}
                {category.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className='border-b'>
                    <td className='px-4 py-2'>{row.id}</td>
                    <td className='px-4 py-2'>{row.description}</td>
                    <td className='px-4 py-2'>{row.method}</td>
                    <td className='px-4 py-2'>
                      <div className='grid grid-cols-4 min-w-60'>
                        <input
                          className='accent-soento-green'
                          type='checkbox'
                          readOnly
                          checked={selectedPoll ? selectedPoll[row.answerKey] === true : false}
                        />
                        <input
                          className='accent-soento-green'
                          type='checkbox'
                          readOnly
                          checked={selectedPoll ? selectedPoll[row.answerKey] === false : false}
                        />

                        <input
                          name={row.answerKey}
                          type='radio'
                          value='true'
                          onChange={handleRadio}
                          checked={data[row.answerKey] === true}
                        />
                        <input
                          name={row.answerKey}
                          type='radio'
                          value='false'
                          onChange={handleRadio}
                          checked={data[row.answerKey] === false}
                        />
                      </div>
                    </td>
                    <td className='px-4 py-2'>
                      <input
                        name={row.noteKey}
                        className='w-full p-2 rounded-lg outline-soento-green'
                        placeholder='Not...'
                        onChange={handleInput}
                        value={data[row.noteKey] || ''}
                      />
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>

        <div className='flex flex-col gap-4 mx-3 mt-8 mb-3 w-max'>
          <div className='grid grid-cols-2 gap-4 w-max'>
            <div className='flex flex-col gap-2'>
              <textarea
                className='border rounded-lg p-2 bg-slate-200 outline-soento-green'
                placeholder='Yorum...'
                rows='5'
                value={(selectedPoll && selectedPoll['Cloumn_Note_Text']) || ''}
                readOnly
              ></textarea>

              <div className='flex gap-4 p-3 rounded-lg bg-slate-200'>
                <div className='flex flex-col gap-2 min-w-24'>
                  <label className='py-1'>Düzenleyen</label>
                  <label className='py-1'>Tarih</label>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <input
                    type='text'
                    className='rounded-lg py-1 px-2 outline-soento-green'
                    value={(selectedPoll && selectedPoll['Cloumn_Organizer']) || ''}
                    readOnly
                  />
                  <input
                    type='date'
                    className='rounded-lg py-1 px-2 outline-soento-green'
                    value={(selectedPoll && selectedPoll['Cloumn_Organize_Date']) || ''}
                    readOnly
                  />
                </div>
              </div>

              <div className='flex gap-4 p-3 rounded-lg bg-slate-200'>
                <div className='flex flex-col gap-2 min-w-24'>
                  <label className='py-1'>İnceleyen</label>
                  <label className='py-1'>Tarih</label>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <input
                    type='text'
                    className='rounded-lg py-1 px-2 outline-soento-green'
                    value={(selectedPoll && selectedPoll['Cloumn_Looker']) || ''}
                    readOnly
                  />
                  <input
                    type='date'
                    className='rounded-lg py-1 px-2 outline-soento-green'
                    value={(selectedPoll && selectedPoll['Cloumn_Looker_Date']) || ''}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------------------------------------- */}

            <div className='flex flex-col gap-2'>
              <textarea
                className='border rounded-lg p-2 bg-slate-200 outline-soento-green'
                placeholder='Yorum...'
                rows='5'
                name='Cloumn_Note_Text'
                value={data['Cloumn_Note_Text'] || ''}
                onChange={handleInput}
              ></textarea>

              <div className='flex gap-4 p-3 rounded-lg bg-slate-200'>
                <div className='flex flex-col gap-2 min-w-24'>
                  <label className='py-1'>Düzenleyen</label>
                  <label className='py-1'>Tarih</label>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <input
                    type='text'
                    className='rounded-lg py-1 px-2 outline-soento-green'
                    name='Cloumn_Organizer'
                    value={data['Cloumn_Organizer'] || ''}
                    onChange={handleInput}
                  />
                  <input
                    type='date'
                    className='rounded-lg py-1 px-2 outline-soento-green'
                    name='Cloumn_Organize_Date'
                    value={data['Cloumn_Organize_Date'] || ''}
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className='flex gap-4 p-3 rounded-lg bg-slate-200'>
                <div className='flex flex-col gap-2 min-w-24'>
                  <label className='py-1'>İnceleyen</label>
                  <label className='py-1'>Tarih</label>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <input
                    type='text'
                    className='rounded-lg py-1 px-2 outline-soento-green'
                    name='Cloumn_Looker'
                    value={data['Cloumn_Looker'] || ''}
                    onChange={handleInput}
                  />
                  <input
                    type='date'
                    className='rounded-lg py-1 px-2 outline-soento-green'
                    name='Cloumn_Looker_Date'
                    value={data['Cloumn_Looker_Date'] || ''}
                    onChange={handleInput}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            className='rounded-lg text-xl p-3 text-white bg-soento-green'
            onClick={handleSubmit}
            disabled={loading}
          >
            Anketi Kaydet
          </button>
        </div>
      </div>

      {loading && <Loader />}
    </>
  )
}
export default TrackList
