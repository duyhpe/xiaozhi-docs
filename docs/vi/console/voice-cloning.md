---
id: voice-cloning
title: 'Nhân bản giọng nói: thu âm, huấn luyện và sử dụng'
description: Huấn luyện giọng nói từ bản thu âm đạt chuẩn và kiểm tra hoạt động với trợ lý.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-14
translation:
  status: review
  sourceHash: 5d21003d488141bf92c973069fa86bafc2e92228044eae981dd814b5b83e4b69
  reviewedAt: '2026-11-15'
---
# Nhân bản giọng nói: thu âm, huấn luyện và sử dụng

Quy trình nhân bản giọng nói bao gồm các bước: kích hoạt dịch vụ, chuẩn bị tệp âm thanh, gửi yêu cầu huấn luyện, chờ giọng nói sẵn sàng và chọn giọng đó cho trợ lý. Hãy kiểm tra điều kiện tài khoản và mức chi phí hiện hành trước khi bắt đầu thu âm.

<a name="scope"></a>

## Chuẩn bị {#scope}

- Đăng nhập vào [trang nhân bản giọng nói](https://xiaozhi.me/console/voice-clone) và hoàn tất xác minh danh tính theo yêu cầu hiện tại. Hệ thống hiện tại hạn chế người dùng vị thành niên thực hiện giao dịch mua mới và gia hạn.
- Đọc kỹ điều khoản mua hàng, mức giá, thời hạn hiệu lực và số lượt huấn luyện cho phép. Chỉ sử dụng các bản thu âm mà bạn có quyền hợp pháp để cung cấp.
- Chuẩn bị một căn phòng yên tĩnh, micro thu âm chất lượng tốt và trình duyệt hỗ trợ ghi âm/tải tệp âm thanh lên. Cấp quyền truy cập micro cho trình duyệt khi cần thu âm.

Các thông báo hiển thị trên trang tại thời điểm sử dụng sẽ quyết định mức giá, hạn mức lượt dùng và thời gian xử lý.

<a name="purchase"></a>

## 1. Kiểm tra kích hoạt dịch vụ {#purchase}

Làm theo quy trình mua mới hoặc gia hạn khả dụng, sau đó quay lại danh sách giọng nói để kiểm tra trạng thái. Thanh toán, trạng thái huấn luyện và trạng thái giọng nói sẵn sàng sử dụng là các giai đoạn tách biệt nhau. Việc thực hiện mua lặp lại nhiều lần sẽ không làm đẩy nhanh tiến độ của một đơn hàng đang được xử lý.

<a name="audio"></a>


## 2. Chuẩn bị âm thanh huấn luyện {#audio}

Chọn một trong hai cách: ghi âm trực tiếp hoặc tải tệp lên. Giới hạn dung lượng tệp nguồn hiện tại là **50MB**; hãy chọn đoạn âm thanh dài từ **8–60 giây** ngay trên trình duyệt trước khi chuyển đổi sang định dạng WAV và gửi đi. Tránh để lẫn nhạc nền, nhiều người nói chồng chéo, âm thanh bị rè vỡ (clipping) và tiếng vọng rõ rệt. Không cắt cụt chữ ở cả hai đầu đoạn thu.

<figure class="source-figure">

[![Nhân bản giọng nói: hai nguồn âm thanh đầu vào dùng chung một quy trình huấn luyện.](../../public/images/en/voice-training-flow.svg)](../../public/images/en/voice-training-flow.svg)

<figcaption>Nhân bản giọng nói: hai nguồn âm thanh đầu vào dùng chung một quy trình huấn luyện. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="record"></a>

### Ghi âm bằng micro {#record}

1. Chọn chế độ ghi âm bằng micro, sau đó chọn ngôn ngữ, phong cách giọng đọc và đoạn văn bản mẫu mà bạn sẽ đọc thực tế.
2. Cho phép trình duyệt truy cập micro khi bắt đầu. Nếu không truy cập được, hãy kiểm tra quyền sử dụng micro và thiết bị đầu vào trong phần cài đặt trang web trên thanh địa chỉ trình duyệt.
3. Đọc rõ ràng trong phòng yên tĩnh, bấm dừng và nghe lại. Thu âm lại nếu nội dung hoặc chất lượng thu chưa đạt. Tiếp tục chuyển sang bước chỉnh sửa âm thanh, điều chỉnh vùng chọn và nghe kiểm tra lại một lần nữa.

<a name="upload"></a>

### Tải lên tệp âm thanh có sẵn {#upload}

1. Chọn một tệp trên máy tính mà trình duyệt có thể giải mã được và xác nhận đúng ngôn ngữ của tệp.
2. Chuyển sang bước chỉnh sửa âm thanh. Chọn một đoạn thoại liên tục, rõ nét trên biểu đồ sóng âm và kéo hai thanh biên để căn chỉnh.
3. Nghe lại đoạn đã chọn và đối chiếu ngôn ngữ cùng thời lượng với yêu cầu hiện hành trước khi tiến hành huấn luyện.

<figure class="source-figure">

[![Minh họa cách chọn đoạn âm thanh. Phần nội dung nằm ngoài hai thanh biên sẽ không được gửi đi; hãy nghe thử đoạn đã chọn trước.](../../public/images/en/voice-audio-selection.svg)](../../public/images/en/voice-audio-selection.svg)

<figcaption>Minh họa cách chọn đoạn âm thanh. Phần nội dung nằm ngoài hai thanh biên sẽ không được gửi đi; hãy nghe thử đoạn đã chọn trước. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

Hình minh họa vùng chọn chỉ nhằm giải thích thao tác cắt tỉa, không phải ảnh chụp màn hình thực tế. Hãy luôn nghe thử đoạn âm thanh thực tế đã chọn trước khi gửi đi, dù là bản ghi âm trực tiếp hay tệp tải lên.

<a name="examples"></a>

### Ba ví dụ so sánh âm thanh: cần cắt tỉa những gì {#examples}

Hãy nghe từng ví dụ “trước khi cắt” (before), xác định vấn đề gặp phải, sau đó so sánh với phiên bản “sau khi cắt” (after). Đây là các mẫu minh họa cách xử lý, không phải khuôn mẫu cố định về thời lượng ghi âm hay số kênh âm thanh.

**Ví dụ 1: tạp âm nền, thời lượng quá dài và bị cắt cụt ở cuối**

Bản gốc có tạp âm nền và phần kết thúc bị cắt ngang đột ngột. Đừng chỉ lấy vài giây đầu tiên: hãy chọn một đoạn ở giữa có âm thanh rõ ràng, liên tục và chứa trọn vẹn các câu nói hoàn chỉnh. Nếu tiếng ồn ảnh hưởng đến toàn bộ bản thu, tốt nhất bạn nên thu âm lại.

[Nghe/tải bản gốc (before)](https://github.com/78/xiaozhi-docs/releases/download/tutorial-assets-2026-11-14/voice-practice-file-001.mp3) · [Nghe/tải bản đã cắt (after)](https://github.com/78/xiaozhi-docs/releases/download/tutorial-assets-2026-11-14/voice-practice-file-002.wav)

<SourceMaterials article="DOC-14" only="VOICE-PRACTICE-file-001,VOICE-PRACTICE-file-002" />

**Ví dụ 2: tiếng động lạ ở phần mở đầu**

Hãy lắng nghe xem có tiếng nuốt nước bọt hay tiếng chép miệng ở đầu đoạn thu không. Di chuyển điểm bắt đầu vùng chọn đến ngay trước câu nói hoàn chỉnh, sạch sẽ đầu tiên, sau đó nghe thử để đảm bảo từ đầu tiên không bị cắt mất âm.

[Nghe/tải bản gốc (before)](https://github.com/78/xiaozhi-docs/releases/download/tutorial-assets-2026-11-14/voice-practice-file-003.mp3) · [Nghe/tải bản đã cắt (after)](https://github.com/78/xiaozhi-docs/releases/download/tutorial-assets-2026-11-14/voice-practice-file-004.wav)

<SourceMaterials article="DOC-14" only="VOICE-PRACTICE-file-003,VOICE-PRACTICE-file-004" />

**Ví dụ 3: câu nói đầu tiên có chất lượng kém**

Nếu câu đầu tiên bị lỗi hoặc kém chất lượng, hãy chọn bắt đầu từ một đoạn rõ ràng, ổn định ở phía sau chứa các câu nói hoàn chỉnh thay vì xóa bỏ toàn bộ bản thu. Căn chỉnh cả hai đầu vùng chọn, kiểm tra kỹ điểm đầu và điểm cuối rồi nghe thử toàn bộ đoạn đã chọn.

[Nghe/tải bản gốc (before)](https://github.com/78/xiaozhi-docs/releases/download/tutorial-assets-2026-11-14/voice-practice-file-005.wav) · [Nghe/tải bản đã cắt (after)](https://github.com/78/xiaozhi-docs/releases/download/tutorial-assets-2026-11-14/voice-practice-file-006.wav)

<SourceMaterials article="DOC-14" only="VOICE-PRACTICE-file-005,VOICE-PRACTICE-file-006" />

**Một tệp tải lên được hệ thống chấp nhận chưa chắc đã là mẫu tham chiếu tốt.** Trang hiện tại chấp nhận thời lượng từ 8–60 giây. Hãy bắt đầu bằng cách chọn khoảng **10–15 giây** giọng nói rõ ràng, đều đặn của một người duy nhất theo từng câu hoàn chỉnh, sau đó điều chỉnh thêm tùy theo phương thức huấn luyện và kết quả nghe thử. Ưu tiên dùng bản thu gốc đơn kênh (mono) để tránh lọt giọng người khác hoặc nhạc đệm ở kênh thứ hai. Một số tệp mẫu ở đây là âm thanh nổi (stereo) hoặc có độ dài khác nhau; chúng chỉ dùng để minh họa cách cắt tỉa chứ không phải tiêu chuẩn bắt buộc cho tệp đầu vào.

Hệ thống không yêu cầu bắt buộc phải chuyển đổi mọi tệp sang tần số lấy mẫu 24 kHz, và cũng không cam kết một tần số lấy mẫu cố định nào luôn khớp nhất với mô hình hiện tại. Hãy làm theo hướng dẫn trên giao diện tải lên; việc khử nhiễu quá mức hoặc chuyển đổi tần số lấy mẫu (resampling) nhiều lần cũng có thể làm biến dạng giọng nói.

<a name="training"></a>

## 3. Gửi yêu cầu, chờ đợi và xử lý lỗi {#training}

1. Kiểm tra lại tệp âm thanh, ngôn ngữ, phong cách và thời lượng. Đọc và đồng ý với xác nhận trên trang, sau đó bắt đầu quá trình nhân bản giọng nói.
2. Theo dõi trạng thái huấn luyện trong danh sách, tải lại trang thủ công nếu cần. Hãy lưu giữ lại tệp âm thanh gốc để tiện kiểm tra nếu có sự cố.
3. Nếu quá trình huấn luyện thất bại, hãy đọc kỹ thông báo lỗi để phân biệt nguyên nhân do điều kiện thu âm, định dạng/thời lượng, hạn mức lượt dùng hay trạng thái dịch vụ. Làm theo các phương án khôi phục khả dụng trên trang.
4. Sau khi huấn luyện thành công, hãy nghe thử mẫu giọng và đặt một tên gợi nhớ (alias) dễ nhận biết.

Hệ thống không cam kết thời gian hoàn tất cố định trong 5 phút. Việc tải lại trang web không phải là thao tác huấn luyện lại. Các tùy chọn thử lại, khiếu nại hay hoàn tiền phụ thuộc vào trạng thái hiện tại và quy định dịch vụ.

<a name="use"></a>

## 4. Chọn giọng nói cho trợ lý (Agent) {#use}

Mở phần cấu hình của trợ lý mục tiêu, chọn giọng nói nhân bản đã sẵn sàng trong mục cài đặt vai trò/giọng nói và lưu lại. Xác nhận thiết bị đang sử dụng trợ lý này, sau đó bắt đầu một cuộc trò chuyện mới. Việc nghe thử thành công trên trang nhân bản giọng nói không đồng nghĩa với việc thiết bị đã tự động chuyển sang dùng giọng nói đó.

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

Danh sách hiển thị trạng thái giọng nói đã sẵn sàng sử dụng và đoạn mẫu phát lại bình thường. Trợ lý đã lưu đúng giọng nói mong muốn và thiết bị thực sự dùng giọng nói đó để trả lời. Nếu một giọng nói đã sẵn sàng nhưng không thể chọn được, hãy kiểm tra trạng thái tài khoản, thời hạn hiệu lực và giới hạn số lượng giọng nói áp dụng cho tài khoản của bạn.

<a name="materials"></a>

## Khắc phục sự cố {#materials}

- **Không thu được âm thanh:** kiểm tra quyền truy cập của trình duyệt, thiết bị đầu vào và cài đặt micro của hệ thống, sau đó thử ghi âm một đoạn ngắn.
- **Không thể giải mã tệp tải lên:** kiểm tra xem tệp có bị hỏng không, sử dụng định dạng mà trình duyệt giải mã được và chọn một đoạn hợp lệ. Việc chỉ đổi tên phần mở rộng (đuôi tệp) không làm chuyển đổi định dạng thực sự của tệp.
- **Huấn luyện thất bại hoặc giọng nói không khả dụng:** lưu lại thông báo lỗi, kiểm tra các yêu cầu về âm thanh, hạn mức huấn luyện, tài khoản và thời hạn sử dụng, sau đó làm theo các tùy chọn khả dụng.

Khi báo cáo sự cố, chỉ cung cấp trạng thái và các bước thực hiện, tuyệt đối không đăng công khai giấy tờ tùy thân hoặc bản thu âm gốc của người khác.

Nếu các bước kiểm tra trên không giải quyết được lỗi, hãy gửi email tới [xiaozhi.ai@tenclass.com](mailto:xiaozhi.ai@tenclass.com) kèm theo thông tin giúp bộ phận hỗ trợ xác định tài khoản của bạn, tên giọng nói, thời điểm xảy ra lỗi, thông báo lỗi trên trang và các bước bạn đã thử. Vui lòng đính kèm chi tiết đơn hàng nếu vấn đề liên quan đến thanh toán. Không đăng công khai giấy tờ tùy thân hay tệp ghi âm gốc; làm theo hướng dẫn của bộ phận hỗ trợ nếu cần cung cấp tệp âm thanh.

### Tình trạng mất chữ, đọc sai từ hoặc chất lượng đầu ra kém

Hãy thử nghiệm riêng biệt với các con số, câu giao tiếp thông thường và tình huống sử dụng thực tế của bạn để phân biệt giữa lỗi tổng hợp ngẫu nhiên với vấn đề chất lượng giọng nói kéo dài. Kiểm tra lại đoạn âm thanh dùng để huấn luyện xem có lẫn tạp âm, bị cắt cụt chữ, lẫn giọng người khác hay có tiếng động lạ ở phần mở đầu không. Hãy thu âm lại hoặc cắt tỉa lại và nghe thử trước, sau đó chỉ huấn luyện lại trong phạm vi cho phép của trang. So sánh cùng một bộ câu kiểm thử trước và sau khi chỉnh sửa; việc huấn luyện lặp đi lặp lại không phải là giải pháp đảm bảo khắc phục được lỗi nuốt chữ ngẫu nhiên. Nếu tình trạng vẫn tiếp diễn, hãy gửi thông báo lỗi cùng các điều kiện kiểm thử liên quan cho bộ phận hỗ trợ.

<a name="next"></a>

## Các bước tiếp theo {#next}

Để giúp trợ lý trả lời dựa trên tài liệu riêng của bạn, hãy tiếp tục với hướng dẫn [Cơ sở tri thức](./knowledge-base.md). Nếu gặp sự cố về quyền sở hữu tài khoản, xem mục [Khắc phục sự cố tài khoản](../faq/account-and-binding.md).
