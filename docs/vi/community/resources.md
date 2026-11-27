---
id: community-resources
title: 'Âm nhạc, lời bài hát và tài nguyên cộng đồng'
description: 'Quản lý tập trung các tệp âm thanh, lời bài hát, thông tin ghi công và hướng dẫn đóng góp kèm các liên kết tải xuống riêng biệt.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Không phải tất cả các dự án và nguyên mẫu từ bên thứ ba đều đã được kiểm thử. Vui lòng kiểm tra chính xác phiên bản và yêu cầu phần cứng trước khi sử dụng.
sourceArticles:
  - DOC-41
translation:
  status: review
  sourceHash: 4ad5128a47fa0a663c6830ae0d9af84e3854cda17761301305a68885c7429f57
  reviewedAt: '2026-11-15'
---
# Âm nhạc, lời bài hát và tài nguyên cộng đồng

Bộ sưu tập này bao gồm 17 cặp tệp âm thanh và lời bài hát. Các cộng tác viên cho biết những tác phẩm này được phát hành theo giấy phép MIT và được tạo bằng các công cụ như Suno. Hãy kiểm tra kỹ thông báo bản quyền của từng mục trước khi sử dụng hoặc phân phối lại.

<a name="materials"></a>

## Tác phẩm và danh sách tệp {#materials}

Các tệp âm thanh và lời bài hát được phân phối tách biệt thông qua một bản phát hành tài nguyên tài liệu (documentation-assets Release). Trang web này cung cấp các liên kết nghe thử và tải xuống trực tiếp. Danh mục lưu trữ giữ nguyên định dạng gốc, tên tệp, dung lượng và mã kiểm tra toàn vẹn SHA-256.

<SourceMaterials article="DOC-41" />

<a name="scope"></a>

## Sử dụng và xác minh {#scope}

- Kiểm tra để đảm bảo từng tệp âm thanh và tệp lời bài hát khớp nhau về tên gọi lẫn nội dung, đồng thời giữ nguyên thông tin ghi công của cộng tác viên/tác giả gốc.
- Xem xét kỹ thông báo bản quyền riêng của từng mục trước khi phân phối lại. Nhãn danh mục “mã nguồn mở” không tự động áp dụng một giấy phép chung cho toàn bộ tài nguyên bên thứ ba không liên quan.
- Việc trang web hỗ trợ phát trực tuyến hoặc tải xuống không đồng nghĩa với việc thiết bị phần cứng hỗ trợ dịch vụ yêu cầu phát nhạc. Khả năng của thiết bị phụ thuộc vào dịch vụ thực tế và phiên bản firmware đang chạy.

Các thông báo cấp phép được cung cấp từ chính những người đóng góp tương ứng. Hãy kiểm tra quyền hạn cho mục đích sử dụng dự kiến của bạn đối với những nội dung có liên quan đến quyền của bên thứ ba.

<a name="contribute"></a>

## Đóng góp và bảo trì {#contribute}

Hãy đóng gói một **tệp âm thanh MP3 cùng tệp lời bài hát LRC tương ứng** và gửi email về địa chỉ [xiaozhi.ai@tenclass.com](mailto:xiaozhi.ai@tenclass.com). Nội dung email cần đính kèm tiêu đề, tên tác giả/ghi công, nguồn gốc, phiên bản có thể truy xuất và tuyên bố giấy phép. Để đóng góp theo các điều khoản của bộ sưu tập này, vui lòng nêu rõ rằng bạn có đủ quyền cung cấp các tệp theo giấy phép MIT; đồng thời liệt kê riêng bất kỳ sự cho phép nào từ bên thứ ba (nếu có). Đội ngũ duy trì sẽ xem xét các đóng góp; việc được đưa vào dịch vụ âm nhạc trên thiết bị không diễn ra tự động.

Tránh đưa các tệp âm thanh dung lượng lớn vào lịch sử Git của bộ tài liệu. Hãy sử dụng một bản phát hành (Release) riêng biệt kèm danh mục mã kiểm tra (checksum). Đối với các tài nguyên thiết kế phần cứng, vui lòng xem mục [Phần cứng mã nguồn mở](./open-hardware.md) và [SF32](./projects/sf32lb52-plugin.md).
