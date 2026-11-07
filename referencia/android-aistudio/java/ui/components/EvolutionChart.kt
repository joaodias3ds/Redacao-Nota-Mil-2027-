package com.example.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.EvolutionItem
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary

@Composable
fun EvolutionChart(
  items: List<EvolutionItem>,
  modifier: Modifier = Modifier,
  onItemSelected: (EvolutionItem) -> Unit = {}
) {
  if (items.isEmpty()) return

  var selectedIndex by remember { mutableIntStateOf(items.lastIndex) }

  val minScore = 600f
  val maxScore = 800f

  Column(
    modifier = modifier
      .fillMaxWidth()
      .testTag("evolution_chart_container")
  ) {
    Box(
      modifier = Modifier
        .fillMaxWidth()
        .height(130.dp)
        .padding(horizontal = 16.dp)
    ) {
      Canvas(
        modifier = Modifier
          .fillMaxWidth()
          .height(110.dp)
          .pointerInput(items) {
            detectTapGestures { offset ->
              val count = items.size
              val spacing = size.width / (count - 1).coerceAtLeast(1)
              val tappedIndex = ((offset.x + spacing / 2) / spacing).toInt().coerceIn(0, items.lastIndex)
              selectedIndex = tappedIndex
              onItemSelected(items[tappedIndex])
            }
          }
      ) {
        val count = items.size
        val width = size.width
        val height = size.height
        val spacing = width / (count - 1).coerceAtLeast(1)

        val points = items.mapIndexed { index, item ->
          val x = index * spacing
          val normalizedY = (item.score - minScore) / (maxScore - minScore)
          val y = height - (normalizedY * height)
          Offset(x, y)
        }

        // Draw connecting line
        val path = Path().apply {
          if (points.isNotEmpty()) {
            moveTo(points.first().x, points.first().y)
            for (i in 1 until points.size) {
              lineTo(points[i].x, points[i].y)
            }
          }
        }

        drawPath(
          path = path,
          color = PinkPrimary,
          style = Stroke(
            width = 4.dp.toPx(),
            cap = StrokeCap.Round,
            join = StrokeJoin.Round
          )
        )

        // Draw point dots
        points.forEachIndexed { index, point ->
          val isSelected = index == selectedIndex
          val isLast = index == items.lastIndex

          if (isLast || isSelected) {
            // Larger outer ring / highlight
            drawCircle(
              color = PinkPrimary.copy(alpha = 0.2f),
              radius = 12.dp.toPx(),
              center = point
            )
            drawCircle(
              color = PinkPrimary,
              radius = 7.dp.toPx(),
              center = point
            )
            drawCircle(
              color = Color.White,
              radius = 2.5.dp.toPx(),
              center = point
            )
          } else {
            // Hollow white circle with pink border
            drawCircle(
              color = Color.White,
              radius = 5.dp.toPx(),
              center = point
            )
            drawCircle(
              color = PinkPrimary,
              radius = 5.dp.toPx(),
              center = point,
              style = Stroke(width = 2.5.dp.toPx())
            )
          }
        }
      }
    }

    Spacer(modifier = Modifier.height(4.dp))

    // X-Axis Labels (R1, R2, R3, R4, R5, R6)
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 16.dp),
      horizontalArrangement = Arrangement.SpaceBetween
    ) {
      items.forEachIndexed { index, item ->
        val isSelected = index == selectedIndex
        Text(
          text = item.code,
          color = if (isSelected) PinkPrimary else TextMuted,
          fontSize = 13.sp,
          fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
        )
      }
    }
  }
}
