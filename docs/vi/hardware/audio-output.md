---
id: audio-output
title: Loa, tai nghe và ngõ ra âm thanh
description: Phân biệt rõ ngõ ra khuếch đại công suất (amplifier), ngõ ra tai nghe và ngõ ra tín hiệu mức đường truyền (line output).
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-05
  - DOC-11
translation:
  status: review
  sourceHash: 4b2c8d1e9f0a3b5c7d9e1f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c
  reviewedAt: '2026-11-15'
---
# Loa, tai nghe và ngõ ra âm thanh

Ngõ ra kéo loa thụ động, ngõ ra tai nghe và ngõ ra tín hiệu mức đường truyền (line output) nối sang loa vi tính có nguồn riêng là ba loại giao tiếp điện hoàn toàn khác nhau. Việc đấu nhầm giữa chúng có thể gây méo tiếng, hỏng linh kiện hoặc làm quá tải nguồn cấp.

<a name="types"></a>

## 1. Phân biệt ba loại ngõ ra âm thanh {#types}

| Loại ngõ ra | Đặc điểm điện và tải tương thích | Ví dụ linh kiện |
| --- | --- | --- |
| **Ngõ ra khuếch đại công suất (Speaker / BTL output)** | Kéo trực tiếp loa thụ động (thường 4Ω hoặc 8Ω). Hai cực đầu ra thường hoạt động ở chế độ cầu (BTL – Bridge-Tied Load), **không nối chung với mass tín hiệu (`GND`)** | Module MAX98357A, NS4150 |
| **Ngõ ra tai nghe (Headphone output)** | Thiết kế cho tai nghe trở kháng thấp (16Ω–32Ω) với điểm tham chiếu chung ở chân vỏ giắc 3.5mm (`GND` hoặc điểm giữa Vmid) | Mạch khuếch đại tai nghe trên chip Codec ES8311 |
| **Ngõ ra mức đường truyền (Line output)** | Tín hiệu biên độ nhỏ, trở kháng cao, dùng để đưa vào ngõ AUX/Line-in của loa chủ động (loa có mạch khuếch đại và nguồn riêng) | Ngõ ra DAC của chip Codec |

<a name="warnings"></a>

## 2. Những lỗi đấu nối cần tránh {#warnings}

- **Không cắm tai nghe vào cọc loa của mạch khuếch đại công suất:** các module như MAX98357A hoặc NS4150 sử dụng ngõ ra dạng cầu (BTL), cả hai chân `SPK+` và `SPK-` đều mang tín hiệu xung PWM cao tần và không có chân nào là `GND`. Cắm tai nghe thông thường (vốn dùng chung mass cho hai kênh trái/phải) vào đây có thể làm chập ngõ ra của IC khuếch đại hoặc gây hỏng tai nghe.
- **Không nối chân `SPK-` xuống `GND`:** tuyệt đối không nối một đầu dây loa hoặc cọc `SPK-` của mạch khuếch đại BTL xuống mass hệ thống (`GND`).
- **Không nối trực tiếp cọc loa công suất vào ngõ Line-in / AUX của loa ngoài:** tín hiệu công suất cao dạng xung Class-D có thể làm quá tải, rè nặng hoặc hỏng tầng tiền khuếch đại của loa ngoài.
- **Kiểm tra trở kháng loa và công suất nguồn:** mạch khuếch đại kéo loa 4Ω sẽ tiêu thụ dòng điện đỉnh lớn hơn so với loa 8Ω ở cùng mức âm lượng. Nếu thiết bị bị sập nguồn hoặc tự khởi động lại khi phát câu trả lời dài, hãy giảm mức âm lượng trên Console hoặc kiểm tra lại cáp/nguồn USB.

<a name="selecting-speaker"></a>

## 3. Lựa chọn loa và hộp cộng hưởng {#selecting-speaker}

- **Loa thụ động có hộp cộng hưởng:** các loại loa hộp nhỏ 8Ω 3W (hoặc 4Ω 3W tùy theo thông số mạch khuếch đại) cho âm lượng rõ ràng hơn nhiều so với loa trần chưa gắn vào hộp kín, vì hộp cộng hưởng giúp triệt tiêu hiện tượng triệt tiêu pha âm tần số thấp.
- **Tương thích chân khuếch đại (Gain) và bật/tắt (SD/MODE):** kiểm tra cấu hình chân `GAIN` và `SD` trên module khuếch đại thực tế để tránh hiện tượng tiếng bị vỡ (clipping) ở mức âm lượng cao hoặc tiếng bụp (pop noise) khi bật tắt.

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

Âm thanh thông báo và giọng trả lời phát ra rõ ràng, không bị rè vỡ tiếng ở mức âm lượng sử dụng thông thường, và bo mạch không bị sập nguồn khởi động lại hay nóng bất thường ở IC khuếch đại.

<a name="next"></a>

## Các bước tiếp theo {#next}

Nếu bạn muốn thiết kế vỏ hộp hoặc bố trí micro và loa sao cho hạn chế tiếng vọng, hãy xem tiếp mục [những lưu ý khi thiết kế phần cứng](./design-guidelines.md) hoặc [xử lý âm thanh và khử tiếng vọng AEC](../development/audio-and-aec.md).
