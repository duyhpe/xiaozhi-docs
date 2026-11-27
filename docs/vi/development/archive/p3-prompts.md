---
id: legacy-p3-prompts
title: Quy trình âm thanh thông báo P3 đời cũ
description: Bảo trì các phiên bản firmware P3 cũ và chuyển sang quy trình xử lý tài nguyên hiện hành.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Chỉ mang tính chất tài liệu lưu trữ lịch sử, không phải hướng dẫn cho phiên bản hiện hành; các tệp tải về phải khớp chính xác với phiên bản firmware và phần cứng được xác định rõ.
sourceArticles:
  - DOC-42
archive: true
translation:
  status: review
  sourceHash: 69fa88714014ee2a33bfc06b892c0b6d233df70a6e1adbd88e055b5824e8666b
  reviewedAt: '2026-11-15'
---
# Quy trình âm thanh thông báo P3 đời cũ

Trang này mô tả cách sử dụng của các phiên bản cũ trước đây. Các bản triển khai đời cũ đặt các tệp P3 trong thư mục `main/assets/zh-CN` và chỉnh sửa trực tiếp tệp được sinh tự động `lang_config.h`. Quy trình quản lý ngôn ngữ (locale) mặc định hiện tại sử dụng định dạng OGG; tuyệt đối không áp dụng trực tiếp các đường dẫn cũ này.

<a name="scope"></a>

## Khi nào nên tham khảo trang này {#scope}

Chỉ sử dụng hướng dẫn này khi bạn đang làm việc với một phiên bản firmware cũ xác định thực sự sử dụng định dạng P3. Hãy chuyển sang đúng thẻ phát hành (tag) của phiên bản đó để kiểm tra cấu trúc thư mục, trình tạo tài nguyên và trình phát âm thanh. Chỉ riêng ngày đăng tải không quyết định tính tương thích.

Kho mã nguồn vẫn lưu giữ [hướng dẫn sử dụng công cụ P3](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/scripts/p3_tools/README.md), do đó việc đưa quy trình này vào mục lưu trữ không có nghĩa là các công cụ đó đã bị xóa bỏ.

<a name="legacy"></a>

## Giới hạn của quy trình đời cũ {#legacy}

Quy trình cũ bao gồm các bước: chuẩn bị âm thanh, chạy tập lệnh `convert_audio_to_p3.py`, chép tệp vào thư mục tài nguyên cũ, tạo lại mã nguồn và tham chiếu đến âm thanh. Tần số lấy mẫu, định dạng khung dữ liệu (frame format) và tên ký hiệu (symbol names) bắt buộc phải khớp với phiên bản firmware đó. Một câu lệnh `ffmpeg` đơn lẻ không phải là quy chuẩn chung cho mọi trình phát.

Một tệp tiêu đề được sinh tự động (generated header) không phải là mã nguồn gốc để bảo trì lâu dài. Ngay cả khi việc chỉnh sửa trực tiếp tạm thời hoạt động trên một phiên bản cũ, bạn vẫn cần xác định rõ nguồn dữ liệu đầu vào thực sự và quy trình biên dịch có thể tái tạo.

<a name="next"></a>

## Chuyển sang quy trình hiện hành {#next}

Hãy sử dụng hướng dẫn [Tùy chỉnh âm thanh thông báo](../custom-prompts.md) cho hệ thống ngôn ngữ (locales), định dạng OGG/Opus và quy trình tạo tài nguyên hiện tại. Luôn giữ lại bản thu âm gốc trước khi chuyển đổi định dạng. Việc chỉ đổi tên phần mở rộng (đuôi tệp) P3 không làm chuyển đổi tệp đó sang định dạng OGG.
